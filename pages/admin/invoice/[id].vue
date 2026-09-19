<template>
  <div>
    <ConfirmationDialog ref="confirmationDialog" />
    <v-btn
      variant="text"
      color="grey-darken-3"
      prepend-icon="mdi-arrow-left"
      @click="$router.go(-1)"
      class="text-capitalize font-weight-bold mb-2"
    >
      Kembali
    </v-btn>

    <v-dialog v-model="dialogDikirim" max-width="500" persistent>
      <v-card class="rounded-lg">
        <v-card-title class="bg-primary text-white pa-4">
          Kirim Invoice
        </v-card-title>
        <v-card-actions class="pa-4 bg-grey-lighten-4">
          <v-spacer />
          <v-btn
            variant="outlined"
            color="grey-darken-1"
            @click="tutupDialogDikirim"
          >
            Batal
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            prepend-icon="mdi-send"
            @click="ubahStatusDikirim"
          >
            Simpan & Kirim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="data.dialogSelesai"
      max-width="700"
      scrollable
      :persistent="readingBuktiBayar || savingInvoice"
    >
      <v-card>
        <v-card-title> Selesaikan Invoice </v-card-title>
        <v-card-text>
          <a-date-picker-new
            label="Tanggal di Bayar"
            v-moodel="invoiceDetail.tanggal_bayar"
          />

          <div class="mt-3">
            <div class="po-upload-row">
              <!-- Upload -->
              <div class="po-upload-wrapper">
                <label for="invoice-po-files" class="po-upload-label">
                  Upload Bukti Bayar
                </label>

                <div class="po-upload-box">
                  <input
                    id="invoice-po-files"
                    type="file"
                    multiple
                    :disabled="readingBuktiBayar || savingInvoice"
                    @change="tambahDokumenBb"
                    class="po-file-input"
                  />

                  <div class="po-upload-icon">↑</div>

                  <div class="po-upload-text">
                    <div class="po-upload-title">Pilih File</div>
                    <div class="po-upload-info">Maks. 650 KB</div>
                  </div>
                </div>

                <div v-if="readingBuktiBayar" class="po-reading">
                  Membaca file PO...
                </div>
              </div>

              <!-- Hasil Upload -->
              <div
                v-if="invoiceDetail.doc_bukti_bayar?.length"
                class="po-files-wrapper"
              >
                <div class="po-upload-label">File Terpilih</div>

                <div class="po-file-list">
                  <div
                    v-for="(document, index) in invoiceDetail.doc_bukti_bayar"
                    :key="index"
                    class="po-file-item"
                  >
                    <a
                      :href="document.dataUrl"
                      :download="document.name"
                      class="po-file-name"
                    >
                      📄 {{ document.name }}
                    </a>

                    <button
                      type="button"
                      class="po-file-remove"
                      :disabled="readingBuktiBayar || savingInvoice"
                      :aria-label="`Hapus ${document.name}`"
                      @click="invoiceDetail.doc_bukti_bayar?.splice(index, 1)"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <div class="preview-container d-flex justify-center">
      <v-card flat class="border rounded-lg pa-4 mb-4 elevation-1" width="850">
        <v-row align="center" justify="space-between">
          <v-col cols="12" sm="6" class="d-flex align-center">
            <v-avatar color="primary" class="mr-3" size="40">
              <v-icon color="white">mdi-file-document-outline</v-icon>
            </v-avatar>
            <div>
              <div class="text-caption text-grey-darken-1 font-weight-medium">
                INVOICE
              </div>
              <div class="text-h6 font-weight-bold primary--text">
                #INV/SNS/2026/{{ invoiceDetail.id }}
              </div>
              <div class="text-caption font-italic">
                <nuxtLink :to="'/admin/penawaran/' + invoiceDetail.id_penawaran"
                  >No. Quotation : {{ invoiceDetail.no_penawaran }}</nuxtLink
                >
              </div>
            </div>
          </v-col>

          <v-col cols="12" sm="6" class="text-sm-right">
            <v-chip
              size="small"
              class="font-weight-bold text-uppercase mb-2"
              label
            >
              {{ invoiceDetail.status }}
            </v-chip>

            <v-chip
              v-if="invoiceDetail.status == 'Draft'"
              prepend-icon="mdi-check-circle-outline"
              color="primary"
              size="small"
              class="font-weight-bold text-uppercase mb-2 ml-3"
              label
              @click="openDialogSelesai"
            >
              <!-- @click="ubahStatusSelesai" -->
              Selesai
            </v-chip>

            <div
              class="text-caption text-grey-darken-1 d-flex align-center justify-sm-end mt-2"
            >
              <v-icon size="small" class="mr-1"
                >mdi-account-circle-outline</v-icon
              >
              <span class="font-weight-medium mr-2">{{
                invoiceDetail.createdBy
              }}</span>
              <span>•</span>
              <v-icon size="small" class="ml-2 mr-1">mdi-pencil-outline</v-icon>
              <span>{{ rubahtanggalunix(invoiceDetail.createdAt) }}</span>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <div class="preview-container d-flex justify-center">
      <v-card
        flat
        class="invoice-reference-card border rounded-lg pa-4 mb-4 elevation-1"
        width="850"
      >
        <v-row align="center" class="ma-0">
          <!-- INVOICE BASED ON -->
          <v-col cols="12" sm="6" class="pa-0 pr-sm-4">
            <div class="reference-label">INVOICE BASED ON</div>
            <div class="reference-value">
              {{ invoiceDetail.no_preorder || "-" }}
            </div>
          </v-col>
          <!-- DOCUMENT PO -->
          <v-col cols="12" sm="6" class="pa-0 pl-sm-4 mt-4 mt-sm-0">
            <div class="reference-label text-sm-right">
              PURCHASE ORDER DOCUMENT
            </div>
            <div v-if="invoiceDetail.doc_bukti_bayar?.length" class="po-list">
              <v-chip
                v-for="(item, index) in invoiceDetail.doc_bukti_bayar"
                :key="index"
                size="small"
                variant="outlined"
                class="po-chip font-weight-medium"
                label
                :href="item.dataUrl"
                @click.prevent="bukaDokumenPo(item)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <v-icon size="15" class="mr-1">
                  mdi-file-document-outline
                </v-icon>
                {{ item.name }}
              </v-chip>
            </div>
            <div v-else class="reference-empty text-sm-right">
              No document attached
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <div class="preview-container d-flex justify-center">
      <div ref="printArea" class="invoice-paper-wrapper">
        <v-card width="850" class="pa-10 invoice-paper elevation-2">
          <!-- Header -->
          <div class="d-flex justify-space-between align-start mb-4">
            <div>
              <img
                src="/public/Logo-SNS.png"
                class="logo-header"
                alt="Logo SNS"
              />
              <div class="company-address">
                <strong>CV. SOLUSI NUSA SEGARA</strong><br />
                Ruko Dream Land Blok A No.05, Dreamland Square, Marina City,
                <br />
                Tanjung Riau, Kec. Sekupang, Kota Batam 29425.
                <br />
                Hp. +62821 9998 8670
              </div>
            </div>
            <div class="invoice-title">INVOICE</div>
          </div>

          <!-- Info Customer & Invoice -->
          <div class="info-grid mb-4">
            <div class="info-box-left">
              <table class="w-100">
                <tbody>
                  <tr>
                    <td width="80">Customer</td>
                    <td width="10">:</td>
                    <td>
                      <span>
                        {{ invoiceDetail.nama_customer }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top">Location</td>
                    <td style="vertical-align: top">:</td>
                    <td style="vertical-align: top">
                      {{ invoiceDetail.alamat_customer }}
                    </td>
                  </tr>
                  <tr>
                    <td width="80">Attn</td>
                    <td width="10">:</td>
                    <td>
                      <span> {{ invoiceDetail.pic }} </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="info-box-right">
              <table class="w-100">
                <tbody>
                  <tr>
                    <td width="110">Invoice No</td>
                    <td width="10">:</td>
                    <td>INV/SNS/2026/{{ invoiceDetail.no_inv }}</td>
                  </tr>
                  <tr>
                    <td>Inv Date</td>
                    <td>:</td>
                    <td>{{ formatTanggal(invoiceDetail.tanggal) }}</td>
                  </tr>
                  <tr>
                    <td>Currency</td>
                    <td>:</td>
                    <td>IDR – (Rupiah)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Main Table -->
          <table class="main-table">
            <thead>
              <tr>
                <th width="3%">NO.</th>
                <th width="47%">DESCRIPTION</th>
                <th width="5%">QTY</th>
                <th width="5%">UOM</th>
                <th width="35%">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in invoiceDetail.item_pekerjaan"
                :key="index"
              >
                <td class="no-cell v-align-middle">
                  <div class="text-center font-weight-bold">
                    <span> {{ index + 1 }}. </span>
                  </div>
                </td>

                <td class="desc-cell">
                  <div class="font-weight-bold">
                    <span style="white-space: pre-line">
                      {{ item.nama }}
                    </span>
                  </div>
                </td>

                <td class="qty-cell v-align-middle">
                  <div class="align-center text-center">
                    <span>{{ item.qty }}</span>
                  </div>
                </td>

                <td class="qty-cell v-align-middle">
                  <div class="align-center text-center">
                    <span>{{ item.uom }}</span>
                  </div>
                </td>

                <td class="amount-cell v-align-middle">
                  <div class="d-flex justify-space-between align-center">
                    <span>Rp</span>
                    <span>{{ rupiah(item.amount) }}</span>
                  </div>
                </td>
              </tr>

              <!-- Total & Tax Calculation -->
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td class="footer-label">
                  <strong>SUB TOTAL</strong>
                </td>
                <td class="footer-value">
                  <div class="d-flex justify-space-between">
                    <span>Rp</span
                    ><span>{{ rupiah(invoiceDetail.subtotal_invoice) }}</span>
                  </div>
                </td>
              </tr>
              <tr v-if="invoiceDetail.pakai_ppn == true">
                <td></td>
                <td></td>
                <td></td>
                <td class="footer-label"><strong>PPn 11%</strong></td>
                <td class="footer-value">
                  <div class="d-flex justify-space-between">
                    <span>Rp</span><span>{{ rupiah(invoiceDetail.ppn) }}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td class="footer-label">
                  <strong>TOTAL</strong>
                </td>
                <td class="footer-value">
                  <div class="d-flex justify-space-between font-weight-bold">
                    <span>Rp</span
                    ><span>{{ rupiah(invoiceDetail.grandtotal_invoice) }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Terbilang -->
          <div class="terbilang-strip">
            <strong
              >Terbilang : #{{ jadirupiah(invoiceDetail.grandtotal_invoice) }}
              Rupiah.
            </strong>
          </div>

          <table class="w-100">
            <tbody>
              <tr>
                <td class="remark-cell">
                  <div class="remark-border-box">
                    <strong class="text-body-2 font-weight-bold"
                      >TERMS & CONDITIONS :</strong
                    >
                    <ul class="remark-list-style" style="list-style: none">
                      <li
                        v-for="(item, index) in invoiceDetail.termCondition"
                        :key="index"
                      >
                        {{ index + 1 }}. {{ item.nama_term }}
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Bank & Signature -->
          <div class="d-flex justify-space-between mt-6 page-break-section">
            <div class="d-flex justify-space-between">
              <div class="bank-details">
                <div>
                  <table class="bank-table">
                    <tbody>
                      <tr>
                        <td>BANK</td>
                        <td>:</td>
                        <td>BCA</td>
                      </tr>
                      <tr>
                        <td>NO. REKENING</td>
                        <td>:</td>
                        <td>8691 8096 92</td>
                      </tr>
                      <tr>
                        <td>NAMA PENERIMA</td>
                        <td>:</td>
                        <td>MUHAMMAD RIDWAN</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="text-center signature-area">
              <span class="font-italic">Your sincerely,</span><br /><strong
                >CV. SOLUSI NUSA SEGARA</strong
              >
              <v-img
                src="/public/ttd_ridwan.png"
                width="120"
                class="ml-11"
              ></v-img>
              <strong>( Muhammad Ridwan )</strong>
            </div>
          </div>
        </v-card>
      </div>
    </div>

    <!-- Actions -->
    <div class="d-flex justify-center gap-3 mt-4">
      <v-btn
        prepend-icon="mdi-file-pdf-box"
        color="red-darken-1"
        variant="elevated"
        :loading="isSavingPdf"
        @click="handleSavePdf"
        width="22%"
        class="mr-2"
      >
        Save PDF
      </v-btn>

      <v-btn
        prepend-icon="mdi-printer"
        color="indigo"
        variant="elevated"
        @click="printInvoice"
        width="22%"
      >
        Print Invoice
      </v-btn>
    </div>

    <div class="preview-container d-flex justify-center">
      <div ref="printArea" class="invoice-paper-wrapper">
        <DeliveryOrder :invoice-detail="invoiceDetail" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import type { ConfirmationDialog } from "#components";
import type { invoiceM, invoiceBuktiBayarM } from "~/types/invoice";
import { uploadStore } from "~/stores/uploadStore";

definePageMeta({
  layout: "admin",
});

const invoiceStore = useinvoiceStore();
const uploadStoreInstance = uploadStore();
const notificationStore = useNotificationStore();
const userStore = useUserStore();
const route = useRoute();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(
  null,
);
const dialogDikirim = ref(false);
const isSavingPdf = ref(false);
const readingBuktiBayar = ref(false);

onMounted(async () => {
  useloadingStore().setLoading(true);
  await invoiceStore.tarikDetailInvoiceAct(route.params.id as string);
  useloadingStore().setLoading(false);
});

const data = reactive({
  dialogSelesai: false,
});

const formatTanggal = (tanggal: string) => {
  if (!tanggal) return "-";

  const date = new Date(tanggal);

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(date)
    .replace(/\//g, "-");
};

function openDialogSelesai() {
  data.dialogSelesai = true;
}

const invoiceDetail = computed(() => invoiceStore.getDetailInvoice);

const poObjectUrls = new Map<string, string>();

async function tambahDokumenBb(event: Event) {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files || []);
  input.value = "";
  if (!files.length || readingBuktiBayar.value || savingInvoice.value) return;

  const draft = invoiceDetail.value;
  const existingBytes = new TextEncoder().encode(
    JSON.stringify(draft),
  ).byteLength;
  const fileBytes = files.reduce(
    (total, file) => total + 4 * Math.ceil(file.size / 3),
    0,
  );
  if (existingBytes + fileBytes > MAX_INVOICE_BYTES) {
    return notificationStore.showError(
      "Total dokumen PO terlalu besar. Kurangi ukuran atau jumlah file.",
    );
  }

  readingBuktiBayar.value = true;
  try {
    const documents: invoiceBuktiBayarM[] = [];
    for (const file of files) {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () =>
          typeof reader.result === "string"
            ? resolve(reader.result)
            : reject(new Error("File PO tidak dapat dibaca"));
        reader.onerror = () =>
          reject(reader.error || new Error("File PO tidak dapat dibaca"));
        reader.onabort = () =>
          reject(new Error("Pembacaan file PO dibatalkan"));
        reader.readAsDataURL(file);
      });
      documents.push({
        name: file.name,
        dataUrl,
        size: file.size,
        contentType: file.type || "application/octet-stream",
      });
    }
    const doc_bukti_bayar = [...(draft.doc_bukti_bayar || []), ...documents];
    if (
      new TextEncoder().encode(JSON.stringify({ ...draft, doc_bukti_bayar }))
        .byteLength > MAX_INVOICE_BYTES
    ) {
      return notificationStore.showError(
        "Ukuran invoice beserta dokumen PO terlalu besar. Kurangi ukuran atau jumlah file.",
      );
    }
    if (invoiceDetail.value === draft && data.dialogSelesai)
      draft.doc_bukti_bayar = doc_bukti_bayar;
  } catch (error) {
    notificationStore.showError(
      "File PO tidak dapat dibaca. Silakan coba lagi.",
    );
  } finally {
    readingBuktiBayar.value = false;
  }
}

function bukaDokumenPo(document: invoiceBuktiBayarM) {
  try {
    let url = document.dataUrl;
    if (url.startsWith("data:")) {
      const cachedUrl = poObjectUrls.get(url);
      if (cachedUrl) {
        url = cachedUrl;
      } else {
        const separator = url.indexOf(",");
        const header = url.slice(0, separator);
        if (separator < 0 || !header.endsWith(";base64")) {
          throw new Error("Format dokumen PO tidak valid");
        }
        const bytes = Uint8Array.from(atob(url.slice(separator + 1)), (char) =>
          char.charCodeAt(0),
        );
        const contentType =
          header.slice(5).split(";")[0] ||
          document.contentType ||
          "application/octet-stream";
        const objectUrl = URL.createObjectURL(
          new Blob([bytes], { type: contentType }),
        );
        poObjectUrls.set(url, objectUrl);
        url = objectUrl;
      }
    }
    window.open(url, "_blank", "noopener,noreferrer");
  } catch {
    notificationStore.showError(
      "Dokumen PO tidak dapat dibuka. Silakan coba unggah ulang file.",
    );
  }
}

onBeforeUnmount(() => {
  poObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  poObjectUrls.clear();
});

const printArea = ref<HTMLElement | null>(null);

function bukaDialogDikirim() {
  uploadStoreInstance.setReset();
  dialogDikirim.value = true;
}

function tutupDialogDikirim() {
  uploadStoreInstance.setReset();
  dialogDikirim.value = false;
}

async function ubahStatusDikirim() {
  const id = route.params.id as string;
  const invoice = JSON.parse(JSON.stringify(invoiceDetail.value)) as invoiceM;
  invoice.status = "Dikirim";
  invoice.dokumen_dikirim = uploadStoreInstance.getUrlRef;

  invoice.dikirimAt = moment().unix();
  invoice.dikirimBy = userStore.getEmail;

  const updated = await invoiceStore.updateInvoiceAct(id, invoice);
  if (!updated) return;

  await invoiceStore.tarikDetailInvoiceAct(id);
  tutupDialogDikirim();
  navigateTo("/admin/invoice/dikirim");
}

async function ubahStatusSelesai() {
  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Selesai",
    "Anda yakin ingin mengubah status invoice menjadi Selesai?",
  );
  if (!confirmed) return;

  const id = route.params.id as string;
  const invoice = JSON.parse(JSON.stringify(invoiceDetail.value)) as invoiceM;
  invoice.status = "Selesai";
  invoice.selesaiAt = moment().unix();
  invoice.selesaiBy = userStore.getEmail;

  const updated = await invoiceStore.updateInvoiceAct(id, invoice);
  if (!updated) return;
  await invoiceStore.tarikDetailInvoiceAct(id);
}

function printInvoice() {
  const content = printArea.value;
  if (!content) return;

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const styles = Array.from(
    document.querySelectorAll('style, link[rel="stylesheet"]'),
  )
    .map((style) => style.outerHTML)
    .join("");

  printWindow.document.write(`
    <html>
      <head>
        <title>INV - </title>
        ${styles}
        <style>
          body { background: white !important; margin: 0; padding: 0; }
          .invoice-paper { border: none !important; box-shadow: none !important; width: 100% !important; max-width: 100% !important; }
          .logo-header { max-width: 100px !important; height: auto !important; }
          @page { margin: 0.5cm; }
          .page-break-section { page-break-inside: avoid; break-inside: avoid; }
        </style>
      </head>
      <body>
        ${content.innerHTML}
        <script>
          window.onload = () => {
            window.print();
            window.close();
          };
        <\/script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

const handleSavePdf = async () => {
  const targetElement = printArea.value;
  if (!targetElement || isSavingPdf.value) return;

  isSavingPdf.value = true;

  try {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);

    const fullCanvas = await html2canvas(targetElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      onclone: (clonedDocument) => {
        clonedDocument
          .querySelectorAll(".no-print, .no-print-cell, .drag-icon")
          .forEach((element) => {
            (element as HTMLElement).style.display = "none";
          });
        clonedDocument
          .querySelectorAll(".print-only-cell")
          .forEach((element) => {
            (element as HTMLElement).style.display = "table-cell";
          });
      },
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Gap footer diperkecil agar pas & tidak terlalu jauh dari bawah
    const footerGapMm = 5; // Gap bawah tipis & pas (sebelumnya 15mm)
    const marginTopSecondPageMm = 12; // Margin atas halaman 2+
    const marginBottomMm = 10; // Margin bawah halaman 2+

    // Deteksi elemen-elemen penting agar tidak terpotong di tengah baris
    const containerRect = targetElement.getBoundingClientRect();
    const scaleY = fullCanvas.height / containerRect.height;

    const breakableElements = targetElement.querySelectorAll(
      ".main-table tr, .terbilang-strip, .remark-border-box, .page-break-section, .info-grid",
    );

    const avoidPositionsPx: { top: number; bottom: number }[] = [];
    breakableElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const topPx = (rect.top - containerRect.top) * scaleY;
      const bottomPx = (rect.bottom - containerRect.top) * scaleY;
      avoidPositionsPx.push({ top: topPx, bottom: bottomPx });
    });

    let currentCanvasY = 0;
    let pageCount = 0;

    while (currentCanvasY < fullCanvas.height) {
      if (pageCount > 0) {
        pdf.addPage();
      }

      const currentTopMarginMm = pageCount > 0 ? marginTopSecondPageMm : 0;
      const currentBottomMarginMm =
        pageCount > 0 ? marginBottomMm : footerGapMm;

      const maxUsablePdfHeightMm =
        pdfHeight - currentTopMarginMm - currentBottomMarginMm;
      let targetSliceHeightPx =
        (maxUsablePdfHeightMm * fullCanvas.width) / pdfWidth;

      const remainingCanvasHeightPx = fullCanvas.height - currentCanvasY;

      if (remainingCanvasHeightPx > targetSliceHeightPx) {
        const theoreticalCutY = currentCanvasY + targetSliceHeightPx;

        // Cek jika pemotongan jatuh di tengah-tengah elemen/baris
        const conflictingElement = avoidPositionsPx.find(
          (pos) => theoreticalCutY > pos.top && theoreticalCutY < pos.bottom,
        );

        if (conflictingElement && conflictingElement.top > currentCanvasY) {
          targetSliceHeightPx = conflictingElement.top - currentCanvasY;
        }
      } else {
        targetSliceHeightPx = remainingCanvasHeightPx;
      }

      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = fullCanvas.width;
      pageCanvas.height = targetSliceHeightPx;

      const ctx = pageCanvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        ctx.drawImage(
          fullCanvas,
          0,
          currentCanvasY,
          fullCanvas.width,
          targetSliceHeightPx,
          0,
          0,
          fullCanvas.width,
          targetSliceHeightPx,
        );
      }

      const imgData = pageCanvas.toDataURL("image/png");
      const slicePdfHeightMm =
        (targetSliceHeightPx * pdfWidth) / fullCanvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        currentTopMarginMm,
        pdfWidth,
        slicePdfHeightMm,
      );

      currentCanvasY += targetSliceHeightPx;
      pageCount++;
    }

    const year = new Date().getFullYear();
    const invoiceId = invoiceDetail.value?.id || route.params.id;

    pdf.save(`INV-SNS-${year}-${invoiceId}.pdf`);
  } catch (error) {
    console.error("Gagal menyimpan PDF:", error);
  } finally {
    isSavingPdf.value = false;
  }
};
</script>

<style scoped>
.logo-header {
  max-width: 100px;
  height: auto;
  object-fit: contain;
  display: block;
}

.invoice-paper {
  font-family: "Arial", sans-serif;
  color: #000;
  line-height: 1.3;
}

.invoice-title {
  font-size: 32px;
  font-weight: bold;
  border-bottom: none;
}
.company-address {
  font-size: 13px;
  margin-top: 5px;
}

.info-grid {
  display: flex;
  border: 1px solid #000;
}
.info-box-left {
  padding: 10px;
  font-size: 14px;
  width: 55%;
}

.info-box-right {
  padding: 10px;
  font-size: 14px;
  width: 45%;
  border-left: 1px solid #000;
}

.main-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

.main-table th {
  background-color: #b8cce4 !important;
  border: 1px solid #000;
  padding: 8px;
  font-weight: bold;
  font-size: 13px;
}

.main-table td {
  border: 1px solid #000;
  padding: 6px;
  font-size: 14px;
}

.bg-light-blue {
  background-color: #b8cce4 !important;
}

.amount-cell {
  padding-left: 5px !important;
  padding-right: 5px !important;
}

.terbilang-strip {
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
  padding: 5px 10px;
  margin: 15px 0;
  font-style: italic;
  font-size: 14px;
}

.bank-details,
.signature-area {
  font-size: 14px;
}
.bank-table {
  border-collapse: collapse;
  font-size: 14px;
}

.bank-table td {
  border: none !important;
  padding: 0px 4px 0px 0px !important;
  vertical-align: top;
  line-height: 1.4;
}

.bank-table td:first-child {
  width: 130px;
  font-weight: bold;
}

.desc-cell {
  padding: 8px !important;
}

.qty-cell {
  vertical-align: top;
  width: 15%;
}

.no-cell {
  width: 5%;
}

.amount-cell {
  vertical-align: top;
  width: 125%;
}

.remark-cell {
  vertical-align: middle;
}

.remark-border-box {
  border: 1px solid #000;
  padding: 8px;
  min-height: 80px;
  height: auto;
}

.remark-list-style {
  list-style: none;
  padding-left: 0;
  margin: 5px 0 0 0;
  font-size: 12px;
}

.footer-label {
  width: 15%;
  padding-right: 10px !important;
  white-space: nowrap;
}

.footer-value {
  width: 20%;
}

.v-align-middle {
  vertical-align: middle !important;
}

.page-break-section {
  page-break-inside: avoid;
  break-inside: avoid;
}

@media print {
  .no-print {
    display: none !important;
  }
  .bg-light-blue,
  .bg-blue-total,
  .main-table th {
    background-color: #b8cce4 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    border: 1px solid #000;
  }
  .page-break-section {
    page-break-inside: avoid;
    break-inside: avoid;
  }
}

/* Tambahkan aturan ini di <style scoped> */
.remark-border-box,
.main-table tr,
.terbilang-strip {
  page-break-inside: avoid !important;
  break-inside: avoid !important;
}

.invoice-reference-card {
  background: #ffffff;
  border-color: #e2e8f0 !important;
}

.reference-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #64748b;
  margin-bottom: 5px;
}

.reference-value {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: 0.02em;
}

.po-chip {
  color: #334155;
  border-color: #cbd5e1 !important;
  background: #f8fafc;
}

.reference-empty {
  font-size: 13px;
  color: #94a3b8;
}

.invoice-reference-card {
  background: #ffffff;
  border-color: #e2e8f0 !important;
}
.reference-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #64748b;
  margin-bottom: 6px;
  line-height: 1.2;
}
.reference-value {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: 0.02em;
  line-height: 1.4;
}
.po-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
}
.po-chip {
  color: #334155;
  border-color: #cbd5e1 !important;
  background: #f8fafc;
  max-width: 100%;
}
.po-chip :deep(.v-chip__content) {
  display: flex;
  align-items: center;
  max-width: 100%;
}
.reference-empty {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.4;
}
@media (max-width: 599px) {
  .po-list {
    justify-content: flex-start;
  }
  .reference-label.text-sm-right {
    text-align: left !important;
  }
  .reference-empty.text-sm-right {
    text-align: left !important;
  }
}

.po-upload-row {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
}

.po-upload-wrapper {
  flex-shrink: 0;
}

.po-files-wrapper {
  flex: 1;
  min-width: 0;
}

.po-upload-label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #334155;
}

/* Upload Box */
.po-upload-box {
  position: relative;
  width: 150px;
  height: 82px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  background: #f8fafc;
  cursor: pointer;
  transition: 0.2s;
}

.po-upload-box:hover {
  border-color: #64748b;
  background: #f1f5f9;
}

.po-file-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.po-upload-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #475569;
  font-size: 17px;
}

.po-upload-title {
  font-size: 12px;
  font-weight: 600;
  color: #334155;
}

.po-upload-info {
  margin-top: 2px;
  font-size: 10px;
  color: #94a3b8;
}

/* Files */
.po-file-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.po-file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 38px;
  padding: 6px 9px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #fff;
}

.po-file-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: #475569;
}

.po-file-remove {
  flex-shrink: 0;
  border: 0;
  background: transparent;
  color: #94a3b8;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

.po-file-remove:hover:not(:disabled) {
  color: #dc2626;
}
</style>
