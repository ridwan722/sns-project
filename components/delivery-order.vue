<script setup lang="ts">
import type { invoiceM } from "~/types/invoice";

const props = defineProps<{
  invoiceDetail: invoiceM;
}>();

const printArea = ref<HTMLElement | null>(null);
const isSavingPdf = ref(false);
const showReceivedDate = ref(true);

const deliveryItems = computed(() =>
  (props.invoiceDetail.item_pekerjaan || []).filter(
    (item) =>
      item.kategori_item === "Barang" ||
      item.kategori_item === "Barang & Jasa",
  ),
);

const documentYear = computed(() => {
  const date = new Date(props.invoiceDetail.tanggal);

  return isNaN(date.getTime()) ? new Date().getFullYear() : date.getFullYear();
});

const deliveryOrderNumber = computed(
  () => `DO/SNS/${documentYear.value}/${props.invoiceDetail.no_inv || "-"}`,
);

const invoiceNumber = computed(
  () => `INV/SNS/${documentYear.value}/${props.invoiceDetail.no_inv || "-"}`,
);

const itemSpacerHeight = computed(() =>
  Math.max(0, 78 - deliveryItems.value.length * 30),
);

const formatTanggal = (tanggal: string) => {
  if (!tanggal) return "-";

  const date = new Date(tanggal);

  if (isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(date)
    .replace(/\//g, "-");
};

const formatTanggalPanjang = (tanggal: string | undefined | null) => {
  if (!tanggal) return "-";

  const date = new Date(tanggal);

  if (isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

function printDeliveryOrder() {
  const content = printArea.value;

  if (!content) return;

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    console.error("Tidak dapat membuka print window.");
    return;
  }

  /* Ambil semua CSS dari halaman */
  const styles = Array.from(
    document.querySelectorAll('style, link[rel="stylesheet"]'),
  )
    .map((style) => style.outerHTML)
    .join("");

  printWindow.document.write(`
    <!DOCTYPE html>

    <html>

      <head>

        <meta charset="UTF-8" />

        <title>
          Delivery Order
        </title>

        ${styles}

        <style>

          


          html,
          body {
            margin: 0 !important;
            padding: 0 !important;

            width: 100% !important;

            background: #ffffff !important;

            font-family: Arial, Helvetica, sans-serif;
          }


          


          .delivery-order-wrapper {
            width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;
          }


          


          .no-print {
            display: none !important;
          }


          


          .invoice-paper {
            width: 210mm !important;

            min-width: 210mm !important;
            max-width: 210mm !important;

            min-height: 297mm !important;

            margin: 0 !important;

            padding: 10mm !important;

            box-sizing: border-box !important;

            background: #ffffff !important;

            border: none !important;

            border-radius: 0 !important;

            box-shadow: none !important;

            overflow: visible !important;
          }

          @page {
            size: A4 portrait;
            margin: 0;
          }

          .document-table,
          .items-table {
            page-break-inside: auto;
          }

          .document-table tr,
          .items-table tr,
          .confirmation-table tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          .document-section,
          .confirmation-table,
          .notice-box {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

        </style>

      </head>


      <body>

        ${content.innerHTML}


        <script>

          window.onload = function () {

            setTimeout(function () {

              window.print();

            }, 300);

          };


          window.onafterprint = function () {

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
  let tempContainer: HTMLDivElement | null = null;

  try {
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    // Clone element supaya tampilan asli tidak terganggu
    const clonedElement = targetElement.cloneNode(true) as HTMLElement;
    const pdfRenderWidth = 794;

    // Buat container sementara
    tempContainer = document.createElement("div");

    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-99999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = `${pdfRenderWidth}px`;
    tempContainer.style.background = "#ffffff";
    tempContainer.style.padding = "0";
    tempContainer.style.margin = "0";

    clonedElement.style.width = `${pdfRenderWidth}px`;

    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    // Hilangkan tombol/action dari PDF
    clonedElement.querySelectorAll(".no-print").forEach((element) => {
      (element as HTMLElement).style.display = "none";
    });

    // Hilangkan shadow dan border card
    clonedElement.querySelectorAll(".invoice-paper").forEach((element) => {
      const el = element as HTMLElement;

      el.style.boxShadow = "none";
      el.style.border = "none";
      el.style.borderRadius = "0";
      el.style.boxSizing = "border-box";
      el.style.width = `${pdfRenderWidth}px`;
      el.style.minWidth = `${pdfRenderWidth}px`;
      el.style.maxWidth = `${pdfRenderWidth}px`;
      el.style.minHeight = "1123px";
      el.style.padding = "38px";
      el.style.overflow = "visible";
    });

    // Kunci rasio logo agar html2canvas tidak merenggangkan gambar.
    clonedElement.querySelectorAll(".brand-logo").forEach((element) => {
      const logo = element as HTMLImageElement;

      logo.style.width = "78px";
      logo.style.height = "78px";
      logo.style.maxWidth = "78px";
      logo.style.maxHeight = "78px";
      logo.style.objectFit = "contain";
    });

    const pdfPaper =
      (clonedElement.querySelector(".invoice-paper") as HTMLElement | null) ||
      clonedElement;

    // Pastikan background putih
    clonedElement.style.background = "#ffffff";

    // Tunggu gambar/logo selesai load
    const images = Array.from(clonedElement.querySelectorAll("img"));

    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      }),
    );

    // Render HTML menjadi canvas
    const canvas = await html2canvas(pdfPaper, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: false,
      imageTimeout: 15000,
      scrollX: 0,
      scrollY: 0,
      windowWidth: pdfRenderWidth,
    });

    // Hapus temporary element
    tempContainer.remove();
    tempContainer = null;

    // =========================
    // CREATE PDF
    // =========================

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Rasio canvas -> PDF
    const ratio = pdfWidth / canvasWidth;

    // Tinggi canvas yang muat dalam 1 halaman A4
    const pageCanvasHeight = Math.round(pdfHeight / ratio);
    const singlePageTolerance = 1.05;
    const canFitOnSinglePage =
      canvasHeight <= pageCanvasHeight * singlePageTolerance;

    if (canFitOnSinglePage) {
      // Kelebihan kecil (misalnya strip 24 px) diperkecil proporsional,
      // sehingga tidak membuat halaman kedua yang nyaris kosong.
      const fitRatio = Math.min(
        pdfWidth / canvasWidth,
        pdfHeight / canvasHeight,
      );
      const imageWidth = canvasWidth * fitRatio;
      const imageHeight = canvasHeight * fitRatio;
      const imageX = (pdfWidth - imageWidth) / 2;
      const imageData = canvas.toDataURL("image/jpeg", 0.95);

      pdf.addImage(
        imageData,
        "JPEG",
        imageX,
        0,
        imageWidth,
        imageHeight,
        undefined,
        "FAST",
      );
    } else {
      let offsetY = 0;
      let pageIndex = 0;

      while (offsetY < canvasHeight) {
        if (pageIndex > 0) {
          pdf.addPage();
        }

        const remainingHeight = canvasHeight - offsetY;
        const currentCanvasHeight = Math.min(
          pageCanvasHeight,
          remainingHeight,
        );

        const pageCanvas = document.createElement("canvas");

        pageCanvas.width = canvasWidth;
        pageCanvas.height = currentCanvasHeight;

        const ctx = pageCanvas.getContext("2d");

        if (!ctx) {
          throw new Error("Canvas context tidak tersedia.");
        }

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          offsetY,
          canvasWidth,
          currentCanvasHeight,
          0,
          0,
          canvasWidth,
          currentCanvasHeight,
        );

        const imageData = pageCanvas.toDataURL("image/jpeg", 0.95);
        const imageHeight = Math.min(currentCanvasHeight * ratio, pdfHeight);

        pdf.addImage(
          imageData,
          "JPEG",
          0,
          0,
          pdfWidth,
          imageHeight,
          undefined,
          "FAST",
        );

        offsetY += currentCanvasHeight;
        pageIndex++;
      }
    }

    const fileReference = String(
      props.invoiceDetail.no_inv || props.invoiceDetail.id || "DO",
    ).replace(/[\\/:*?"<>|]+/g, "-");

    pdf.save(`Delivery-Order-SNS-${fileReference}.pdf`);
  } catch (error) {
    console.error("Gagal menyimpan PDF Delivery Order:", error);

    alert(
      "Gagal membuat PDF. Silakan buka Console (F12) untuk melihat detail error.",
    );
  } finally {
    tempContainer?.remove();
    isSavingPdf.value = false;
  }
};
</script>

<template>
  <div class="delivery-order-wrapper">
    <div ref="printArea" class="invoice-paper-wrapper">
      <v-card width="850" class="invoice-paper elevation-2 mx-auto">
        <div class="document-shell">
          <header class="do-brand-header">
            <div class="brand-logo-panel">
              <img
                src="/Logo-SNS.png"
                class="brand-logo"
                alt="Logo CV. Solusi Nusa Segara"
              />
            </div>

            <div class="brand-copy">
              <!-- <span class="brand-kicker">DELIVERY DOCUMENT</span> -->
              <h2>CV. SOLUSI NUSA SEGARA</h2>
              <p>
                Ruko Dream Land Blok A No.05, Dreamland Square, Marina City<br />
                Tanjung Riau, Sekupang, Kota Batam 29425<br />
                Hp. +62 821 9998 8670
              </p>
            </div>
          </header>

          <section class="document-title-block">
            <h1>Delivery Order</h1>

          </section>

          <table class="document-table summary-table">
            <colgroup>
              <col class="summary-party-column" />
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <td rowspan="4" class="party-cell">
                  <div class="cell-heading">Consignee / Customer</div>
                  <div class="party-content">
                    <strong>{{ invoiceDetail.nama_customer || "-" }}</strong>
                    <p>{{ invoiceDetail.alamat_customer || "-" }}</p>
                  </div>
                </td>
                <th class="grid-label">D/O No.</th>
                <th class="grid-label">D/O Date</th>
                <th class="grid-label">Invoice No.</th>
              </tr>
              <tr>
                <td class="grid-value">{{ deliveryOrderNumber }}</td>
                <td class="grid-value">{{ formatTanggal(invoiceDetail.tanggal) }}</td>
                <td class="grid-value">{{ invoiceNumber }}</td>
              </tr>
              <tr>
                <th class="grid-label">Quotation No.</th>
                <th class="grid-label">PO No.</th>
                <th class="grid-label">Customer ID</th>
              </tr>
              <tr>
                <td class="grid-value">{{ invoiceDetail.no_penawaran || "-" }}</td>
                <td class="grid-value">{{ invoiceDetail.no_preorder || "-" }}</td>
                <td class="grid-value">{{ invoiceDetail.id_customer || "-" }}</td>
              </tr>

              <tr>
                <th colspan="4" class="section-row">Delivery Information</th>
              </tr>
              <!-- <tr>
                <td rowspan="4" class="party-cell">
                  <div class="cell-heading">Deliver To</div>
                  <div class="party-content">
                    <strong>{{ invoiceDetail.nama_customer || "-" }}</strong>
                    <p>{{ invoiceDetail.alamat_customer || "-" }}</p>
                  </div>
                </td>
                <th colspan="2" class="grid-label">Vessel / Voyage</th>
                <th class="grid-label">Place of Delivery</th>
              </tr> -->
              <tr>
                <td colspan="3" class="grid-value grid-value-strong">
                  {{ invoiceDetail.vessel || "-" }}
                </td>
                <td class="grid-value grid-value-strong">
                  {{ invoiceDetail.location || "Batam" }}
                </td>
              </tr>
              <tr>
                <th colspan="3" class="grid-label">Contact Person</th>
                <th class="grid-label">Telephone</th>
              </tr>
              <tr>
                <td colspan="3" class="grid-value">{{ invoiceDetail.pic || "-" }}</td>
                <td class="grid-value">{{ invoiceDetail.no_telp || "-" }}</td>
              </tr>
              <tr>
                <th colspan="4" class="section-row">Commodity / Scope</th>
              </tr>
              <tr>
                <td colspan="4" class="commodity-value">
                  {{ invoiceDetail.perihal || "-" }}
                </td>
              </tr>
            </tbody>
          </table>

          <table class="items-table document-section">
            <colgroup>
              <col class="item-no-column" />
              <col class="item-description-column" />
              <col class="item-category-column" />
              <col class="item-qty-column" />
              <col class="item-unit-column" />
            </colgroup>
            <thead>
              <tr>
                <th colspan="5" class="section-row section-row-left">
                  Item Information
                </th>
              </tr>
              <tr class="item-column-headings">
                <th class="item-no">No.</th>
                <th class="item-description">Description of Goods</th>
                <th class="item-category">Category</th>
                <th class="item-qty">Qty</th>
                <th class="item-unit">Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!deliveryItems.length">
                <td colspan="5" class="empty-item-row">No delivery items</td>
              </tr>
              <tr
                v-for="(item, index) in deliveryItems"
                :key="`do-item-${index}`"
                class="item-data-row"
              >
                <td class="item-no">{{ index + 1 }}</td>
                <td class="item-description">
                  <!-- Tanpa v-model: perubahan hanya untuk tampilan/cetak/PDF. -->
                  <div
                    class="editable-item-name"
                    contenteditable="plaintext-only"
                    spellcheck="false"
                    title="Klik untuk mengubah nama item di tampilan ini"
                    :aria-label="`Nama item ${index + 1}, dapat diedit`"
                  >{{ item.nama }}</div>
                </td>
                <td class="item-category">{{ item.kategori_item || "-" }}</td>
                <td class="item-qty">{{ item.qty }}</td>
                <td class="item-unit">
                  <span
                    class="editable-item-unit"
                    contenteditable="plaintext-only"
                    spellcheck="false"
                    title="Klik untuk mengubah unit di tampilan ini"
                    :aria-label="`Unit item ${index + 1}, dapat diedit`"
                  >{{ item.uom || "Unit" }}</span>
                </td>
              </tr>
              <tr
                v-if="itemSpacerHeight > 0"
                class="item-space-row"
                :style="{ height: itemSpacerHeight + 'px' }"
              >
                <td colspan="5"></td>
              </tr>
            </tbody>
          </table>




          <table class="confirmation-table document-section">
            <tbody>
              <tr>
                <th colspan="2" class="section-row section-row-left">
                  Delivery Confirmation
                </th>
              </tr>
              <tr>
                <td class="confirmation-cell">
                  <span class="confirmation-role">Delivered by</span>
                  <strong>CV. SOLUSI NUSA SEGARA</strong>
                  <div class="signature-space"></div>
                  <div class="signature-field">
                    <span>Name</span>
                    <b>{{ invoiceDetail.sign_by || "................................" }}</b>
                  </div>
                  <div class="signature-field">
                    <span>Date</span>
                     <b class="mt-2">................................</b>
                  </div>
                </td>
                <td class="confirmation-cell">
                  <span class="confirmation-role">Received by</span>
                  <strong>{{ invoiceDetail.nama_customer || "Customer" }}</strong>
                  <div class="signature-space"></div>
                  <div class="signature-field">
                    <span>Name</span>
                    <b class="mt-2">................................</b>
                  </div>
                  <div class="signature-field signature-date-field">
                    <span>Date</span>

                    <b class="mt-2">................................</b>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- <footer class="document-footer">
            CV. Solusi Nusa Segara · Batam, Kepulauan Riau ·
            +62 821 9998 8670
          </footer> -->
        </div>
      </v-card>
    </div>

    <div class="no-print action-bar">
      <v-btn
        color="red"
        variant="elevated"
        prepend-icon="mdi-file-pdf-box"
        :loading="isSavingPdf"
        @click="handleSavePdf"
      >
        Save PDF Delivery Order
      </v-btn>

      <v-btn
        color="primary"
        variant="elevated"
        prepend-icon="mdi-printer"
        @click="printDeliveryOrder"
      >
        Cetak Delivery Order
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.delivery-order-wrapper {
  width: 100%;

  margin-top: 20px;
}

.invoice-paper-wrapper {
  width: 100%;

  overflow-x: auto;

  padding-bottom: 4px;
}

.invoice-paper {
  --document-border: #373940;
  --document-fill: #d8edf8;
  --document-fill-soft: #eef8fd;

  width: 850px;
  min-height: 1202px;

  padding: 38px !important;

  box-sizing: border-box;

  overflow: visible !important;

  color: #16171a;

  background: #ffffff !important;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  line-height: 1.28;
}

.document-shell {
  width: 100%;
}

.do-brand-header {
  display: grid;
  grid-template-columns: 34% 66%;
  align-items: start;

  min-height: 90px;

  padding: 0 6px 8px;

  box-sizing: border-box;
}

.brand-logo-panel {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  min-height: 82px;

  padding-top: 2px;
}

.brand-logo {
  display: block;

  width: 78px;
  max-width: 78px;
  height: 78px;
  max-height: 78px;

  aspect-ratio: 1 / 1;

  object-fit: contain;
}

.brand-copy {
  width: 100%;

  padding-top: 1px;

  text-align: left;
}

.brand-kicker {
  display: block;

  margin-bottom: 4px;

  color: #4d4e54;

  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.7px;
}

.brand-copy h2 {
  margin: 0 0 3px;

  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.35px;
}

.brand-copy p {
  margin: 0;

  color: #303136;

  font-size: 9.5px;
  font-weight: 600;
  line-height: 1.35;
}

.document-title-block {
  position: relative;

  min-height: 62px;

  padding: 0 0 9px;

  box-sizing: border-box;
}

.document-title-block h1 {
  margin: 0;

  text-align: center;

  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.document-issued-date {
  position: absolute;
  right: 3px;
  bottom: 6px;

  font-size: 10px;
  font-weight: 600;
}

.document-table,
.items-table,
.confirmation-table {
  width: 100%;

  border-collapse: collapse;
  border-spacing: 0;

  table-layout: fixed;
}

.document-table th,
.document-table td,
.items-table th,
.items-table td,
.confirmation-table th,
.confirmation-table td {
  border: 1px solid var(--document-border);
}

.summary-party-column {
  width: 34%;
}

.party-cell {
  padding: 0;

  vertical-align: top;
}

.cell-heading,
.grid-label {
  background: var(--document-fill-soft);

  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.cell-heading {
  padding: 3px 7px;

  border-bottom: 1px solid var(--document-border);
}

.party-content {
  min-height: 58px;

  padding: 7px 9px;

  box-sizing: border-box;
}

.party-content strong {
  display: block;

  margin-bottom: 5px;

  font-size: 10.5px;
  text-transform: uppercase;
}

.party-content p {
  margin: 0;

  white-space: pre-line;
}

.grid-label {
  height: 21px;

  padding: 3px 5px;

  text-align: center;
  vertical-align: middle;
}

.grid-value {
  min-height: 23px;

  padding: 4px 6px;

  text-align: center;
  vertical-align: middle;

  overflow-wrap: anywhere;
}

.grid-value-strong {
  font-weight: 700;
  text-transform: uppercase;
}

.section-row {
  padding: 3px 7px;

  background: var(--document-fill);

  color: #202126;

  text-align: center;
  font-size: 10px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: 0.35px;
}

.section-row-left {
  text-align: left;
}

.commodity-value {
  min-height: 26px;

  padding: 6px 8px;

  font-weight: 700;
  text-transform: uppercase;
}

.document-section {
  margin-top: -1px;
}

.items-table {
  width: 100%;

  border-collapse: collapse;
  table-layout: fixed;
}

.item-column-headings th {
  padding: 4px 5px;

  background: #f4faff;

  text-align: center;
  font-size: 9.5px;
  font-weight: 800;
}

.item-no-column {
  width: 24px;
}

.item-category-column {
  width: 18%;
}

.item-qty-column {
  width: 11%;
}

.item-unit-column {
  width: 15%;
}

.item-no {
  padding-right: 2px !important;
  padding-left: 2px !important;

  text-align: center;
}

.item-description {
  text-align: left;
}

.item-category {
  text-align: center;
}

.item-qty {
  text-align: center;
}

.item-unit {
  text-align: center;
}

.item-data-row td {
  padding: 6px 6px;

  vertical-align: top;

  font-size: 10px;
}

.item-space-row td {
  padding: 0;

  border-top: 0;
}

.empty-item-row {
  height: 34px;

  padding: 8px;

  color: #6c6d72;

  text-align: center;
  font-style: italic;
}

.editable-item-name {
  min-height: 16px;

  white-space: pre-line;

  cursor: text;
}

.editable-item-unit {
  display: inline-block;

  min-width: 22px;

  cursor: text;
}

.editable-item-name:focus,
.editable-item-unit:focus {
  outline: 1px dashed #777;

  outline-offset: 2px;
}

.control-table {
  font-size: 9.5px;
}

.notice-box {
  border: 1px solid var(--document-border);
}

.notice-box > .section-row {
  border-bottom: 1px solid var(--document-border);
}

.notice-content {
  min-height: 72px;

  padding: 7px 10px;

  box-sizing: border-box;
}

.notice-content strong {
  display: block;

  margin-bottom: 4px;

  font-size: 10px;
}

.notice-content p {
  margin: 0 0 5px;
}

.notice-content .notice-reference {
  margin-bottom: 0;

  color: #45464c;

  font-size: 9.5px;
}

.confirmation-table {
  font-size: 10px;
}

.confirmation-cell {
  width: 50%;

  padding: 7px 10px 8px;

  vertical-align: top;
}

.confirmation-role {
  display: block;

  margin-bottom: 3px;

  color: #55565c;

  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.confirmation-cell > strong {
  display: block;

  min-height: 14px;

  font-size: 10px;
  text-transform: uppercase;
}

.signature-space {
  height: 62px;
}

.signature-field {
  display: flex;
  align-items: center;
  gap: 5px;

  min-height: 18px;

  border-top: 1px solid #a9a9ad;
}

.signature-field span {
  width: 37px;
  flex: 0 0 37px;

  color: #4a4b50;

  font-size: 9px;
  font-weight: 700;
}

.signature-field b {
  font-weight: 600;
}

.signature-date-field {
  position: relative;
}

.date-toggle-chip {
  margin-left: auto;

  cursor: pointer;
}

.document-footer {
  padding-top: 7px;

  color: #66676d;

  text-align: center;
  font-size: 8.5px;
  letter-spacing: 0.25px;
}

.action-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
  max-width: 850px;

  margin: 16px auto 0;
}

@media screen {
  .editable-item-name:hover,
  .editable-item-unit:hover {
    background: #fff7d6;
  }
}

@media (max-width: 900px) {
  .invoice-paper-wrapper {
    padding-bottom: 12px;
  }
}

@media print {
  @page {
    size: A4 portrait;

    margin: 0;
  }

  .delivery-order-wrapper,
  .invoice-paper-wrapper {
    width: 100% !important;

    margin: 0 !important;
    padding: 0 !important;

    overflow: visible !important;
  }

  .no-print {
    display: none !important;
  }

  .invoice-paper {
    width: 210mm !important;
    min-width: 210mm !important;
    max-width: 210mm !important;
    min-height: 297mm !important;

    margin: 0 !important;
    padding: 10mm !important;

    box-sizing: border-box !important;

    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;

    overflow: visible !important;
  }

  .document-section,
  .notice-box,
  .confirmation-table {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .document-table tr,
  .items-table tr,
  .confirmation-table tr {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
</style>
