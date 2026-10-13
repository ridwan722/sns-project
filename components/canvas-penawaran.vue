<template>
  <v-dialog v-model="dialogWarna" max-width="360px">
    <v-card class="rounded-xl elevation-8">
      <v-card-title
        class="d-flex align-center justify-space-between pa-4 bg-slate-50"
      >
        <div class="d-flex align-center gap-2">
          <v-icon color="primary" size="20">mdi-palette-outline</v-icon>
          <span class="text-subtitle-1 font-weight-bold color-slate-800"
            >Tema Warna Header</span
          >
        </div>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          density="comfortable"
          @click="dialogWarna = false"
        />
      </v-card-title>
      <v-divider />
      <v-card-text class="d-flex justify-center pa-4">
        <v-color-picker
          v-model="warnaBackgroundCustom"
          mode="hex"
          hide-inputs
          show-swatches
          elevation="0"
        />
      </v-card-text>
      <v-divider />
      <v-card-actions class="pa-3 bg-slate-50">
        <v-spacer />
        <v-btn
          color="primary"
          variant="flat"
          size="small"
          class="px-5 rounded-lg"
          @click="dialogWarna = false"
        >
          Terapkan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div class="top-bar-actions d-flex justify-center align-center mb-4 no-print">
    <v-btn-toggle
      v-model="lang"
      mandatory
      color="primary"
      variant="outlined"
      density="comfortable"
      class="rounded-lg bg-white elevation-1"
    >
      <v-btn value="id" class="px-4 font-weight-bold text-caption">
        <v-icon start size="16">mdi-translate</v-icon>
        Bahasa Indonesia
      </v-btn>
      <v-btn value="en" class="px-4 font-weight-bold text-caption">
        <v-icon start size="16">mdi-earth</v-icon>
        English
      </v-btn>
    </v-btn-toggle>
  </div>

  <div>
    <div id="offer-to-print" class="offer-card">
      <div class="watermark">
        <img src="/Logo-SNS.png" alt="Logo Watermark" />
      </div>

      <div class="header-section">
        <div class="header-company">
          <div class="header-brand">
            <div class="logo-wrapper">
              <img src="/Logo-SNS.png" alt="Logo Header" />
            </div>
          </div>
          <div class="header-contact">
            <h1 class="company-name">CV. SOLUSI NUSA SEGARA</h1>
            <p class="address-line">
              Ruko Dream Land Blok A No.05,<br />
              Dreamland Square, Marina City Tanjung Riau,<br />
              Kec. Sekupang, Kota Batam 29425
            </p>
            <p class="phone-line">Hp. +62821 9998 8670</p>
          </div>
        </div>

        <div class="header-document">
          <div class="header-document-meta">
            <div><span>{{ t.refNo }}</span><strong>{{ props.detailpenawaran.no_penawaran }}</strong></div>
            <div><span>{{ t.date }}</span><strong>{{ rubahtanggalpenawaran(props.detailpenawaran.tanggal_penawaran) }}</strong></div>
          </div>
          <h2 class="document-title">QUOTATION</h2>
        </div>
      </div>

      <div class="header-divider">
        <div
          class="accent-bar"
          :style="{ backgroundColor: warnaBackgroundCustom }"
        ></div>
        <div class="secondary-bar"></div>
      </div>

      <div class="content-body">
        <section class="quotation-parties">
          <div class="customer-details">
            <h2 class="section-heading">{{ t.quotationFor }}</h2>
            <div class="meta-row">
              <span class="lbl">{{ t.to }}</span>
              <span class="sep">:</span>
              <span class="val bold">{{
                props.detailpenawaran.nama_perusahaan || "-"
              }}</span>
            </div>

            <div class="meta-row">
              <span class="lbl">{{ t.address }}</span>
              <span class="sep">:</span>
              <span class="val bold">{{
                props.detailpenawaran.alamat_perusahaan || "-"
              }}</span>
            </div>
            <div class="meta-row">
              <span class="lbl">{{ t.attn }}</span>
              <span class="sep">:</span>
              <span class="val">{{ props.detailpenawaran.pic || "-" }}</span>
            </div>

            <div class="meta-row">
              <span class="lbl">{{ t.phone }}</span>
              <span class="sep">:</span>
              <span class="val">{{
                props.detailpenawaran.no_telp || "-"
              }}</span>
            </div>

            <div class="meta-row">
              <span class="lbl">{{ t.email }}</span>
              <span class="sep">:</span>
              <span class="val">{{ props.detailpenawaran.email || "-" }}</span>
            </div>
          </div>
          <div class="quotation-details">
            <div class="meta-row">
              <span class="lbl">{{ t.subject }}</span>
              <span class="sep">:</span>
              <span class="val bold-navy">{{
                props.detailpenawaran.perihal || "-"
              }}</span>
            </div>
            <div class="meta-row">
              <span class="lbl">{{ t.vessel }}</span>
              <span class="sep">:</span>
              <span class="val">{{ props.detailpenawaran.vessel }}</span>
            </div>

            <div class="meta-row">
              <span class="lbl">{{ t.location }}</span>
              <span class="sep">:</span>
              <span class="val">Batam</span>
            </div>
          </div>
        </section>

        <div class="text-salutation">
          <p class="salutation-title">{{ t.salutationTitle }}</p>
          <p class="salutation-body" v-if="lang === 'id'">
            Sehubungan dengan kebutuhan operasional perusahaan Bapak/Ibu,
            bersama surat ini kami mengajukan penawaran harga untuk
            <strong>{{ props.detailpenawaran.perihal }}</strong> kepada
            <strong>{{ props.detailpenawaran.nama_perusahaan }}</strong> dengan
            rincian sebagai berikut:
          </p>
          <p class="salutation-body" v-else>
            In response to your company's operational requirements, we are
            pleased to submit our quotation for
            <strong>{{ props.detailpenawaran.perihal }}</strong> to
            <strong>{{ props.detailpenawaran.nama_perusahaan }}</strong
            >, with the following details:
          </p>
        </div>

        <div class="table-container">
          <table class="modern-table">
            <thead>
              <tr
                :style="{
                  backgroundColor: warnaBackgroundCustom,
                  color: warnaTeksHeader,
                }"
              >
                <th
                  width="5%"
                  class="text-center no-print-cell"
                  :style="{ color: warnaTeksHeader }"
                >
                  <v-tooltip location="top">
                    <template #activator="{ props: tooltipProps }">
                      <v-btn
                        v-bind="tooltipProps"
                        class="no-print theme-btn"
                        size="20"
                        variant="flat"
                        icon="mdi-palette"
                        :style="{ color: warnaTeksHeader }"
                        @click="dialogWarna = true"
                      />
                    </template>
                    <span>Ubah Warna Aksentuasi</span>
                  </v-tooltip>
                </th>
                <th
                  width="5%"
                  class="text-center print-only-cell"
                  :style="{ color: warnaTeksHeader }"
                >
                  NO
                </th>

                <th
                  width="43%"
                  class="text-left"
                  :style="{ color: warnaTeksHeader }"
                >
                  {{ t.thDescription }}
                </th>
                 <!-- <th
                  width="9%"
                  class="text-center no-print"

                >
                  Kategori
                </th> -->
                <th
                  width="60"
                  class="text-center"
                  :style="{ color: warnaTeksHeader }"
                >
                  {{ t.thQty }}
                </th>
                <th
                  width="9%"
                  class="text-center"
                  :style="{ color: warnaTeksHeader }"
                >
                  {{ t.thUom }}
                </th>
                <th
                  width="15%"
                  class="text-right"
                  :style="{ color: warnaTeksHeader }"
                >
                  {{ t.thUnitPrice }}
                </th>
                <th
                  width="19%"
                  class="text-right"
                  :style="{ color: warnaTeksHeader }"
                >
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody ref="tableBodyRef">
              <tr
                v-for="(item, index) in props.detailpenawaran.penawaran_item"
                :key="index"
                :class="{ 'zebra-row': index % 2 === 1 }"
              >
                <td class="text-center row-num drag-handle" width="36">
                  <div style="display: flex; align-items: center">
                    <v-icon size="12" class="drag-icon no-print mr-1"
                      >mdi-drag-vertical</v-icon
                    >
                    <span>{{ index + 1 }}.</span>
                  </div>
                </td>

                <td
                  class="text-left text-slate-800"
                  style="white-space: pre-line"
                >
                  {{ item.nama }}
                </td>
                 <!-- <td class="text-center no-print">{{ item.kategori_item }}</td> -->
                <td class="text-center">{{ item.qty }}</td>
                <td class="text-center text-slate-500">{{ item.uom }}</td>
                <td class="text-right text-slate-600">
                  Rp {{ rupiah(item.amount) }}
                </td>
                <td class="text-right text-navy">
                  Rp {{ rupiah(item.subtotal_item) }}
                </td>
              </tr>
            </tbody>

            <tfoot v-if="showTotal">
              <tr class="summary-row subtotal-row" v-if="Number(props.detailpenawaran.discount_penawaran) > 0">
                <td colspan="5" class="text-right text-slate-600">
                  {{ t.subtotal }}
                </td>
                <td class="text-right text-slate-800">
                  Rp
                  {{
                    rupiah(
                      props.detailpenawaran.subtotal_penawaran ||
                        props.detailpenawaran.grand_total_penawaran,
                    )
                  }}
                </td>
              </tr>

              <tr class="summary-row subtotal-row" v-if="Number(props.detailpenawaran.discount_penawaran) > 0">
                <td colspan="5" class="text-right text-slate-600">
                  Discount {{ props.detailpenawaran.discount_penawaran }} %
                </td>
                <td class="text-right text-slate-800">
                  Rp
                  {{
                    rupiah(
                      Math.round(
                        ((props.detailpenawaran.subtotal_penawaran || 0) *
                          (props.detailpenawaran.discount_penawaran || 0)) /
                          100,
                      ),
                    )
                  }}
                </td>
              </tr>

              <tr class="summary-row grand-total-row">
                <td colspan="5" class="text-right font-weight-bold text-navy">
                  {{ t.grandTotal }}
                </td>
                <td class="text-right font-weight-bold text-navy gt-text">
                  Rp {{ rupiah(props.detailpenawaran.grand_total_penawaran) }}
                </td>
              </tr>

              <tr class="terbilang-row">
                <td colspan="6">
                  <div class="terbilang-inner">
                    <span class="terbilang-lbl">{{ t.amountInWords }}:</span>
                    <span class="terbilang-val"
                      >#
                      {{ teksTerbilang }}
                    </span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mx-auto no-print">
            <v-chip
              :prepend-icon="
                showTotal ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              size="x-small"
              class="my-1"
              @click="showTotal = !showTotal"
            >
              {{
                showTotal
                  ? "Sembunyikan Rincian Harga"
                  : "Tampilkan Rincian Harga"
              }}
            </v-chip>
          </div>
        </div>

        <p class="closing-paragraph" v-if="showTable">
          {{ t.closingText }}
        </p>

        <section class="terms-block" v-if="showTable">
          <h3 class="terms-heading">TERMS &amp; CONDITIONS</h3>
          <ol class="terms-list">
            <li
              class="term-item"
              v-for="(item, index) in detailpenawaran.termCondition"
              :key="index"
            >
              <span class="term-number">{{ index + 1 }}.</span>
              <span class="term-text">{{ item.nama_term }}</span>
            </li>
          </ol>
        </section>

        <div class="signatures-wrapper">
          <div class="sig-block">
            <p class="sig-header">{{ t.sigHeaderLeft }}</p>
            <p class="sig-sub">CV. SOLUSI NUSA SEGARA</p>
            <div class="sig-img-container">
              <img src="/ttd_ridwan.png" alt="Signature" class="sig-image" />
            </div>
            <p class="sig-person-name">Muhammad Ridwan</p>
          </div>

          <div class="sig-block">
            <p class="sig-header">{{ t.sigHeaderRight }}</p>
            <p class="sig-sub">
              {{ props.detailpenawaran.nama_perusahaan || "" }}
            </p>
            <div class="sig-placeholder"></div>
            <p class="sig-person-name">
              ( .................................... )
            </p>
            <p class="sig-person-role">{{ t.sigRoleRight }}</p>
          </div>
        </div>
      </div>

      <div class="footer-wave"></div>
    </div>

    <div
      class="document-actions d-flex flex-wrap justify-center align-center mt-6 mb-12 no-print"
    >
      <v-btn
        width="300"
        height="46"
        color="indigo-darken-3"
        elevation="3"
        prepend-icon="mdi-printer"
        class="quotation-action-btn text-capitalize font-weight-bold rounded-lg text-subtitle-2"
        @click="handlePrint"
      >
        Print Quotation
      </v-btn>
      <v-btn
        width="300"
        height="46"
        color="red-darken-2"
        elevation="3"
        prepend-icon="mdi-file-pdf-box"
        class="quotation-action-btn text-capitalize font-weight-bold rounded-lg text-subtitle-2"
        :loading="isSavingPdf"
        :disabled="isSavingPdf"
        @click="handleSavePdf"
      >
        Save PDF
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { penawaranM } from "~/types/penawaranModel";

const props = defineProps<{
  detailpenawaran: penawaranM;
}>();

const lang = ref<"id" | "en">("en");

const labelSubTotal = ref("TOTAL AMOUNT");
const showTotal = ref(true);

watch(lang, (newLang) => {
  labelSubTotal.value = newLang === "id" ? "TOTAL HARGA" : "TOTAL AMOUNT";
});

const dialogWarna = ref(false);
const warnaBackgroundCustom = ref("#061b3c");
const showTable = ref(true);
const tableBodyRef = ref<HTMLElement | null>(null);
const isSavingPdf = ref(false);

const t = computed(() => {
  if (lang.value === "id") {
    return {
      refNo: "No. Penawaran",
      date: "Tanggal",
      quotationFor: "Quotation Untuk",
      to: "Kepada",
      attn: "Up.",
      phone: "No. Telp",
      email: "Email",
      address: "Alamat",
      location: "Lokasi",
      subject: "Perihal",
      vessel: "Kapal/Vessel",
      salutationTitle: "Dengan hormat,",
      thDescription: "DESKRIPSI / KETERANGAN",
      thQty: "QTY",
      thUom: "SATUAN",
      thUnitPrice: "HARGA SATUAN",
      subtotal: "SUBTOTAL",
      grandTotal: "GRAND TOTAL",
      amountInWords: "Terbilang",
      closingText:
        "Demikian surat penawaran harga ini kami sampaikan untuk menjadi bahan pertimbangan. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.",
      sigHeaderLeft: "Hormat Kami,",
      sigHeaderRight: "Disetujui Oleh,",
      sigRoleRight: "Cap & Tanda Tangan",
    };
  }
  return {
    refNo: "Quotation Ref No",
    date: "Date",
    quotationFor: "Quotation For",
    to: "To",
    attn: "Attn",
    phone: "Phone",
    email: "Email",
    location: "Location",
    address: "Address",
    subject: "Subject",
    vessel: "Vessel",
    salutationTitle: "Dear Sir/Madam,",
    thDescription: "DESCRIPTION / KETERANGAN",
    thQty: "QTY",
    thUom: "UOM",
    thUnitPrice: "UNIT/PRICE",
    subtotal: "SUBTOTAL",
    grandTotal: "GRAND TOTAL",
    amountInWords: "Amount in words",
    closingText:
      "We hereby submit our price quotation for your consideration. Thank you for your attention and cooperation.",
    sigHeaderLeft: "Yours faithfully,",
    sigHeaderRight: "Approve by,",
    sigRoleRight: "Stamp & Signature",
  };
});

function terbilangIndonesia(angka: number): string {
  const bil = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
  ];
  if (angka < 12) return bil[angka];
  if (angka < 20) return terbilangIndonesia(angka - 10) + " Belas";
  if (angka < 100)
    return (
      terbilangIndonesia(Math.floor(angka / 10)) +
      " Puluh " +
      terbilangIndonesia(angka % 10)
    );
  if (angka < 200) return "Seratus " + terbilangIndonesia(angka - 100);
  if (angka < 1000)
    return (
      terbilangIndonesia(Math.floor(angka / 100)) +
      " Ratus " +
      terbilangIndonesia(angka % 100)
    );
  if (angka < 2000) return "Seribu " + terbilangIndonesia(angka - 1000);
  if (angka < 1000000)
    return (
      terbilangIndonesia(Math.floor(angka / 1000)) +
      " Ribu " +
      terbilangIndonesia(angka % 1000)
    );
  if (angka < 1000000000)
    return (
      terbilangIndonesia(Math.floor(angka / 1000000)) +
      " Juta " +
      terbilangIndonesia(angka % 1000000)
    );
  if (angka < 1000000000000)
    return (
      terbilangIndonesia(Math.floor(angka / 1000000000)) +
      " Miliar " +
      terbilangIndonesia(angka % 1000000000)
    );
  return "";
}

function numberToWordsEnglish(n: number): string {
  if (n === 0) return "Zero";
  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function convert(num: number): string {
    if (num < 20) return units[num];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] + (num % 10 ? " " + units[num % 10] : "")
      );
    if (num < 1000)
      return (
        units[Math.floor(num / 100)] +
        " Hundred" +
        (num % 100 ? " " + convert(num % 100) : "")
      );
    if (num < 1000000)
      return (
        convert(Math.floor(num / 1000)) +
        " Thousand" +
        (num % 1000 ? " " + convert(num % 1000) : "")
      );
    if (num < 1000000000)
      return (
        convert(Math.floor(num / 1000000)) +
        " Million" +
        (num % 1000000 ? " " + convert(num % 1000000) : "")
      );
    return (
      convert(Math.floor(num / 1000000000)) +
      " Billion" +
      (num % 1000000000 ? " " + convert(num % 1000000000) : "")
    );
  }

  return convert(n).trim();
}

const teksTerbilang = computed(() => {
  const total = props.detailpenawaran?.grand_total_penawaran || 0;
  if (!total) return "-";

  if (lang.value === "id") {
    return `${terbilangIndonesia(total).replace(/\s+/g, " ").trim()} Rupiah`;
  }
  return `${numberToWordsEnglish(total).replace(/\s+/g, " ").trim()} Rupiah`;
});

const warnaTeksHeader = computed(() => {
  const hex = warnaBackgroundCustom.value.replace("#", "");
  if (hex.length !== 6) return "#0f2b48";

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#0f2b48" : "#ffffff";
});

const formatTanggal = (tanggal: string) => {
  if (!tanggal) return "-";
  return new Intl.DateTimeFormat(lang.value === "id" ? "id-ID" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(tanggal));
};

const rubahtanggalpenawaran = (tgl: any) => formatTanggal(tgl);
const rupiah = (val: number) => new Intl.NumberFormat("id-ID").format(val || 0);

const handlePrint = async () => {
  const printContents = document.getElementById("offer-to-print")?.outerHTML;
  if (!printContents) return;

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  let styles = "";
  document.querySelectorAll("link[rel='stylesheet'], style").forEach((node) => {
    if (node.tagName === "LINK") {
      styles += `@import url('${(node as HTMLLinkElement).href}');`;
    } else {
      styles += node.innerHTML;
    }
  });

  doc.write(`
    <html>
      <head>
        <title>Penawaran_${props.detailpenawaran?.no_penawaran || "SNS"}</title>
        <style>
          ${styles} 

          @media print {
            @page {
              size: A4;
              margin: 0mm;
            }

            html, body {
              font-family: 'Segoe UI', Arial, sans-serif;
              height: 100%;
              margin: 0 !important;
              padding: 0 !important;
              background: #fff !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            #offer-to-print.offer-card {
              box-shadow: none !important;
              width: 210mm !important;
              min-height: 297mm !important;
              height: auto !important;
              margin: 0 !important;
              padding: 12mm 15mm 14mm !important;
              box-sizing: border-box !important;
              position: relative !important;
              overflow: visible !important;
              page-break-after: avoid;
              page-break-before: avoid;
            }

            .no-print, .no-print-cell, .drag-icon {
              display: none !important;
            }

            .print-only-cell {
              display: table-cell !important;
            }

            .footer-wave {
              position: absolute !important;
              bottom: 0 !important;
              left: 0 !important;
              width: 100% !important;
              height: 130px !important;
              z-index: 0 !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="offer-card">
          ${printContents}
        </div>
      </body>
    </html>
  `);

  doc.close();

  const printAction = () => {
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 600);
  };

  await Promise.all(
    Array.from(doc.images, (image) => image.decode().catch(() => undefined)),
  );
  printAction();
};

const handleSavePdf = async () => {
  const offerElement = document.getElementById("offer-to-print");
  if (!offerElement || isSavingPdf.value) return;

  isSavingPdf.value = true;

  try {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);
    const canvas = await html2canvas(offerElement, {
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
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imageHeight = (canvas.height * pageWidth) / canvas.width;
    const image = canvas.toDataURL("image/png");

    let heightLeft = imageHeight;
    let position = 0;
    pdf.addImage(image, "PNG", 0, position, pageWidth, imageHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 1) {
      position = heightLeft - imageHeight;
      pdf.addPage();
      pdf.addImage(image, "PNG", 0, position, pageWidth, imageHeight);
      heightLeft -= pageHeight;
    }

    const number = props.detailpenawaran?.no_penawaran || "SNS";
    const nama = props.detailpenawaran?.pic || "SNS";
    const subject = props.detailpenawaran?.perihal || "";
    const nomorQT = number.match(/\d{5}$/)?.[0] || "00000";

    pdf.save(`Quotation ${subject} #${nomorQT}.pdf`);
  } finally {
    isSavingPdf.value = false;
  }
};
</script>

<style scoped>
.offer-card {
  width: 210mm;
  min-height: 297mm;
  padding: 12mm 15mm 14mm;
  margin: 0 auto;
  background: #ffffff;
  position: relative;
  overflow: visible;
  box-shadow: 0 12px 35px rgba(15, 23, 42, 0.1);
  font-family:
    "Segoe UI",
    -apple-system,
    BlinkMacSystemFont,
    Roboto,
    sans-serif;
  color: #1e293b;
  box-sizing: border-box;
}

.watermark {
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.055;
  width: 390px;
  z-index: 0;
  pointer-events: none;
}
.watermark img {
  width: 100%;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 1;
  gap: 6mm;
  min-height: 35mm;
  padding-bottom: 10px;
}

.header-company {
  display: grid;
  grid-template-columns: 28mm minmax(0, 1fr);
  align-items: start;
  gap: 4mm;
  width: 62%;
  flex: 0 0 62%;
}

.header-document {
  min-width: 0;
  flex: 1;
  text-align: right;
}

.header-document-meta {
  display: grid;
  gap: 4px;
  margin-bottom: 7px;
  color: #475569;
  font-size: 9px;
}

.header-document-meta div {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 6px;
  text-align: left;
}

.header-document-meta strong {
  color: #263746;
  font-weight: 600;
}

.document-title {
  margin: 0;
  color: #263746;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: -1.3px;
  line-height: 1;
}

.header-brand {
  min-width: 0;
}

.logo-wrapper img {
  width: 28mm;
  height: auto;
  display: block;
}

.company-name {
  font-size: 12px;
  font-weight: 800;
  color: #0f2b48;
  letter-spacing: 0.3px;
  margin: 0 0 3px;
  line-height: 1.2;
}

.header-contact {
  min-width: 0;
  text-align: left;
  line-height: 1.4;
  padding-top: 0;
}

.address-line,
.phone-line {
  font-size: 9.5px;
  color: #475569;
  margin: 0;
  display: block;
  max-width: 100%;
}

.header-divider {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 0;
  margin-bottom: 15px;
}

.accent-bar {
  height: 2px;
  width: 100%;
  border-radius: 2px;
  transition: background-color 0.2s ease;
}

.secondary-bar {
  height: 2px;
  width: 100%;
  background-color: #cbd5e1;
}

.content-body {
  position: relative;
  z-index: 1;
}

.doc-meta-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.quotation-parties {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(180px, 0.8fr);
  gap: 24px;
  padding: 0 0 13px;
  margin-bottom: 12px;
  border-bottom: 1px solid #d1d5d8;
}

.section-heading {
  margin: 0 0 7px;
  color: #263746;
  font-size: 18px;
  font-weight: 600;
}

.quotation-details {
  padding-top: 28px;
}

.quotation-details .meta-row {
  margin-bottom: 2px;
}

.doc-badge {
  font-size: 27px;
  font-weight: 700;
  color: #263746;
  letter-spacing: -1.2px;
  padding: 0;
  background: transparent;
  border: 0 !important;
  text-transform: none;
}

.doc-date {
  font-size: 11px;
  color: #475569;
}

.info-grid-card {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 22px;
  background: transparent;
  border: 0;
  border-radius: 0;
  border-top: 1px solid #d4d4d4;
  padding: 12px 0 10px;
  margin-bottom: 12px;
}

.meta-row {
  display: flex;
  align-items: center;
  font-size: 9.5px;
  margin-bottom: 2px;
}
.meta-row:last-child {
  margin-bottom: 0;
}

.meta-row .lbl {
  width: 88px;
  color: #64748b;
  font-weight: 600;
  flex-shrink: 0;
}

.meta-row .sep {
  width: 12px;
  color: #94a3b8;
}

.meta-row .val {
  color: #334155;
  font-weight: 500;
}

.meta-row .val.highlight {
  font-weight: 700;
  color: #2563eb;
}

.meta-row .val.bold {
  font-weight: 700;
  color: #1e293b;
}

.meta-row .val.bold-navy {
  font-weight: 700;
  color: #0f2b48;
}

.text-salutation {
  font-size: 11px;
  line-height: 1.5;
  color: #334155;
  margin-bottom: 12px;
}

.salutation-title {
  font-weight: 700;
  margin-bottom: 3px;
  color: #0f2b48;
}

.salutation-body {
  text-align: justify;
  margin: 0;
}

.table-container {
  border-radius: 0;
  overflow: hidden;
  border: 1px solid #aeb5bb;
  margin-bottom: 14px;
  box-shadow: none;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10.5px;
  table-layout: fixed;
}

.modern-table th {
  padding: 1px 4px;
  line-height: 1.15;
  font-weight: 700;
  font-size: 9.5px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  border: 1px solid #aeb5bb;
  transition: color 0.3s ease;
}

.modern-table td {
  padding: 1px 4px;
  line-height: 1.2;
  color: #334155;
  vertical-align: middle;
  border: 1px solid #d5d8da;
}

.modern-table tbody tr.zebra-row {
  background-color: #ffffff;
}

.modern-table tbody tr:last-child td {
  border-bottom: 1px solid #cbd5e1;
}

.modern-table tfoot .summary-row td {
  padding: 2px 6px;
  font-size: 10px;
  letter-spacing: 0.3px;
  border-bottom: 1px solid #e2e8f0;
}

.modern-table tfoot .subtotal-row {
  background-color: #ffffff;
}

.modern-table tfoot .grand-total-row {
  background-color: #ffffff;
}

.gt-text {
  font-size: 11.5px !important;
}

.terbilang-row td {
  background-color: #ffffff;
  padding: 4px 6px !important;
  border-bottom: none !important;
}

.terbilang-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
}

.terbilang-lbl {
  font-weight: 800;
  color: #64748b;
  letter-spacing: 0.5px;
}

.terbilang-val {
  font-style: italic;
  font-weight: 700;
  color: #0f2b48;
}

.drag-handle {
  cursor: move !important;
  user-select: none;
}

.drag-icon {
  opacity: 0.4;
  transition: opacity 0.2s;
}

.drag-handle:hover .drag-icon {
  opacity: 1;
}

.row-num {
  color: #64748b;
  font-weight: 600;
}

.print-only-cell {
  display: none;
}

.closing-paragraph {
  font-size: 10.5px;
  color: #475569;
  line-height: 1.4;
  margin-bottom: 14px;
}

.closing-paragraph ul {
  margin-top: 5px;
}

.terms-block {
  margin: 10px 0 18px;
  padding: 0;
  break-inside: avoid;
  page-break-inside: avoid;
}

.terms-heading {
  margin: 0 0 6px;
  padding: 0 0 4px;
  border-bottom: 1px solid #64748b;
  color: #1e293b;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.25px;
}

.terms-list {
  display: block;
  margin: 0;
  padding-left: 17px;
  list-style: none;
}

.term-item {
  display: flex;
  gap: 5px;
  margin: 0 0 3px;
  color: #475569;
  font-size: 9.5px;
  line-height: 1.3;
}

.term-number {
  min-width: 12px;
  color: #334155;
  font-weight: 600;
}

.signatures-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  page-break-inside: avoid;
}

.sig-block {
  width: 210px;
  text-align: center;
}

.sig-header {
  font-size: 10.5px;
  font-weight: 600;
  color: #475569;
  margin: 0;
}

.sig-sub {
  font-size: 9.5px;
  font-weight: 700;
  color: #0f2b48;
  margin: 2px 0 0 0;
  text-transform: uppercase;
}

.sig-img-container {
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sig-image {
  max-height: 95px;
  max-width: 130px;
  object-fit: contain;
}

.sig-placeholder {
  height: 95px;
}

.sig-person-name {
  font-size: 10.5px;
  font-weight: 700;
  color: #0f2b48;
  margin: 0;
  border-bottom: 1px solid #94a3b8;
  padding-bottom: 2px;
}

.sig-person-role {
  font-size: 9px;
  color: #64748b;
  margin-top: 2px;
}

.footer-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  z-index: 0;
  pointer-events: none;
}

.footer-wave svg {
  width: 100%;
  height: 100%;
  display: block;
}

.text-navy {
  color: #0f2b48;
}
.text-slate-800 {
  color: #1e293b;
}
.text-slate-600 {
  color: #475569;
}
.text-slate-500 {
  color: #64748b;
}
.text-slate-400 {
  color: #94a3b8;
}
.uppercase {
  text-transform: uppercase;
}

.theme-btn {
  background: transparent !important;
  box-shadow: none !important;
}

:deep(.header-input-field input) {
  text-align: right !important;
  font-size: 9.5px !important;
  font-weight: 800 !important;
  text-transform: uppercase;
  color: var(--header-text-color, #0f2b48) !important;
  padding: 0 !important;
  min-height: unset !important;
  transition: color 0.3s ease;
}

:deep(.header-input-field .v-field__input) {
  padding: 0 !important;
  min-height: 18px !important;
}

@media print {
  .offer-card {
    box-shadow: none !important;
    margin: 0 auto !important;
    min-height: 297mm !important;
  }

  .modern-table tr,
  .signatures-wrapper {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .no-print {
    display: none !important;
  }
}

.document-actions {
  gap: 16px;
}

@media (max-width: 600px) {
  .offer-card {
    width: 100%;
    min-height: 0;
    padding: 20px;
  }

  .header-section,
  .header-company,
  .quotation-parties {
    grid-template-columns: 1fr;
    flex-direction: column;
  }

  .header-company {
    width: 100%;
    flex-basis: auto;
  }

  .header-document {
    width: 100%;
    text-align: left;
  }

  .header-document-meta div {
    grid-template-columns: 92px minmax(0, 1fr);
  }

  .quotation-details {
    padding-top: 0;
  }

  .document-actions {
    padding: 0 16px;
  }

  .quotation-action-btn {
    width: 100% !important;
  }
}
</style>
