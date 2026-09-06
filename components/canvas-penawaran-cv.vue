<template>
  <v-dialog v-model="dialogWarna" max-width="360px">
    <v-card class="rounded-xl elevation-8">
      <v-card-title class="d-flex align-center justify-space-between pa-4 bg-slate-50">
        <div class="d-flex align-center gap-2">
          <v-icon color="primary" size="20">mdi-palette-outline</v-icon>
          <span class="text-subtitle-1 font-weight-bold color-slate-800">Tema Warna Aksentuasi</span>
        </div>
        <v-btn icon="mdi-close" variant="text" size="small" density="comfortable" @click="dialogWarna = false" />
      </v-card-title>
      <v-divider />
      <v-card-text class="d-flex justify-center pa-4">
        <v-color-picker v-model="warnaBackgroundCustom" mode="hex" hide-inputs show-swatches elevation="0" />
      </v-card-text>
      <v-divider />
      <v-card-actions class="pa-3 bg-slate-50">
        <v-spacer />
        <v-btn color="primary" variant="flat" size="small" class="px-5 rounded-lg" @click="dialogWarna = false">
          Terapkan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div>
    <div id="offer-to-print" ref="printAreaRef" class="offer-card">
      <!-- Watermark Background -->
      <div class="watermark">
        <img src="/public/Logo-SNS.png" alt="Logo Watermark" />
      </div>

      <!-- Header Sederhana / Polos -->
      <div class="simple-header">
        <div class="simple-company">
          <h1 class="company-title">CV. LAIN</h1>
          <p class="company-sub">
            Jl. Ahmad Yani Blok B No. 8, Alexandria Business Center, Taman Baloi, Batam Kota, <br> Kota Batam, Kepulauan Riau 29432<br />
            Telp/Hp: +62856 9247 8428
          </p>
        </div>
        <div class="simple-logo">
          <img src="/public/Logo-SNS.png" alt="Logo Header" />
        </div>
      </div>

      <hr class="simple-hr" />

      <!-- Content Body -->
      <div class="content-body">
        <!-- Judul & Tanggal -->
        <div class="simple-doc-title">
          <h2>PENAWARAN HARGA</h2>
          <p>Batam, {{ rubahtanggalpenawaran(props.detailpenawaran.tanggal_penawaran) }}</p>
        </div>

        <!-- Informasi Detail dalam Bentuk Tabel Polos -->
        <table class="simple-info-table">
          <tr>
            <td width="15%" class="label">No. Penawaran</td>
            <td width="2%">:</td>
            <td width="33%"><strong>{{ props.detailpenawaran.no_penawaran || "-" }}</strong></td>
            <td width="15%" class="label">Kepada</td>
            <td width="2%">:</td>
            <td width="33%"><strong>{{ props.detailpenawaran.nama_perusahaan || "-" }}</strong></td>
          </tr>
          <tr>
            <td class="label">Perihal</td>
            <td>:</td>
            <td>{{ props.detailpenawaran.perihal || "-" }}</td>
            <td class="label">Attn</td>
            <td>:</td>
            <td>{{ props.detailpenawaran.pic || "-" }}</td>
          </tr>
          <tr>
            <td class="label">Vessel</td>
            <td>:</td>
            <td>{{ props.detailpenawaran.vessel || "-" }}</td>
            <td class="label">Telp</td>
            <td>:</td>
            <td>{{ props.detailpenawaran.no_telp || "-" }}</td>
          </tr>
        </table>

        <!-- Table View Sederhana -->
        <div class="table-wrapper">
          <table class="simple-table">
            <thead>
              <tr :style="{ backgroundColor: warnaBackgroundCustom, color: warnaTeksHeader }">
                <th width="36" class="text-center no-print-cell" :style="{ color: warnaTeksHeader }">
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
                <th width="32" class="text-center print-only-cell" :style="{ color: warnaTeksHeader }">
                  NO
                </th>
                <th class="text-left" :style="{ color: warnaTeksHeader }">
                  DESCRIPTION / KETERANGAN
                </th>
                <th width="70" class="text-center" :style="{ color: warnaTeksHeader }">
                  QTY
                </th>
                <th width="65" class="text-center" :style="{ color: warnaTeksHeader }">
                  UOM
                </th>
                <th width="135" class="text-right" :style="{ color: warnaTeksHeader }">
                  UNIT PRICE
                </th>
                <th width="145" class="text-right" :style="{ color: warnaTeksHeader }">
                  <v-text-field
                    v-model="labelSubTotal"
                    variant="plain"
                    density="compact"
                    hide-details
                    class="header-input-field"
                    :style="{ '--header-text-color': warnaTeksHeader }"
                  />
                </th>
              </tr>
            </thead>
            <tbody ref="tableBodyRef">
              <tr
                v-for="(item, index) in localItems"
                :key="index"
              >
                <td class="text-center row-num drag-handle" width="36">
                  <div class="d-flex align-center justify-center">
                    <v-icon size="12" class="drag-icon no-print mr-1">mdi-drag-vertical</v-icon>
                    <span>{{ index + 1 }}.</span>
                  </div>
                </td>
                <td class="text-left item-name">
                  {{ item.nama }}
                </td>
                <!-- Editable QTY -->
                <td class="text-center">
                  <input
                    type="number"
                    v-model.number="item.qty"
                    class="editable-input text-center"
                    @input="recalculateRow(index)"
                  />
                </td>
                <td class="text-center text-sub">{{ item.uom }}</td>
                <!-- Editable Unit Price -->
                <td class="text-right">
                  <div class="d-flex align-center justify-end">
                    <span class="mr-1">Rp</span>
                    <input
                      type="number"
                      v-model.number="item.amount"
                      class="editable-input text-right"
                      @input="recalculateRow(index)"
                    />
                  </div>
                </td>
                <!-- Editable Subtotal Item -->
                <td class="text-right font-weight-bold">
                  <div class="d-flex align-center justify-end">
                    <span class="mr-1">Rp</span>
                   {{ rupiah(item.subtotal_item)}}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Total & Terbilang Polos -->
        <div class="simple-totals-container">
          <div class="simple-terbilang">
            <strong>Terbilang:</strong><br />
            <i># {{ jadirupiah(computedGrandTotal) }} Rupiah #</i>
          </div>

          <table class="simple-calc-table">
            <tr>
              <td class="lbl">Subtotal</td>
              <td class="val">Rp {{ rupiah(computedSubtotal) }}</td>
            </tr>
            <tr class="grand-row">
              <td class="lbl"><strong>Grand Total</strong></td>
              <td class="val"><strong>Rp {{ rupiah(computedGrandTotal) }}</strong></td>
            </tr>
          </table>
        </div>

        <!-- Tanda Tangan Standard Sederhana -->
        <div class="simple-signatures">
          <div class="sig-col">
            <p>Hormat Kami,</p>
            <p class="sig-company-name">CV. LAIN</p>
            <div class="sig-space">
              <img src="/public/ttd_ridwan.png" alt="Signature" class="sig-img" />
            </div>
            <p class="sig-person"><u>Dzikril Agung Nugraha</u></p>
            <p class="sig-role">Authorized Signature</p>
          </div>

          <div class="sig-col">
            <p>Disetujui Oleh,</p>
            <p class="sig-company-name">{{ props.detailpenawaran.nama_perusahaan || "CLIENT COMPANY" }}</p>
            <div class="sig-space"></div>
            <p class="sig-person">( .................................... )</p>
            <p class="sig-role">Stamp & Signature</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="document-actions d-flex flex-wrap justify-center align-center mt-6 mb-12 no-print">
      <v-btn
        width="200"
        height="46"
        color="grey-darken-1"
        elevation="2"
        prepend-icon="mdi-refresh"
        class="quotation-action-btn text-capitalize font-weight-bold rounded-lg text-subtitle-2 mr-md-2"
        @click="resetLocalItems"
      >
        Reset Nominal
      </v-btn>
      <v-btn
        width="250"
        height="46"
        color="indigo-darken-3"
        elevation="3"
        prepend-icon="mdi-printer"
        class="quotation-action-btn text-capitalize font-weight-bold rounded-lg text-subtitle-2"
        @click="handlePrint"
      >
        Print Quotation CV lain
      </v-btn>
      <v-btn
        width="250"
        height="46"
        color="red-darken-2"
        elevation="3"
        prepend-icon="mdi-file-pdf-box"
        class="quotation-action-btn text-capitalize font-weight-bold rounded-lg text-subtitle-2 ml-md-4 mt-2 mt-md-0"
        :loading="isSavingPdf"
        :disabled="isSavingPdf"
        @click="handleSavePdf"
      >
        Simpan PDF
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { penawaranM } from "~/types/penawaranModel";

const labelSubTotal = ref("SUB TOTAL");

const props = defineProps<{
  detailpenawaran: penawaranM;
}>();

// 1. TAMBAHKAN TEMPLATE REF UNTUK AREA CETAK
const printAreaRef = ref<HTMLElement | null>(null);

const dialogWarna = ref(false);
const warnaBackgroundCustom = ref("#0f172a");
const showTable = ref(true);
const tableBodyRef = ref<HTMLElement | null>(null);
const isSavingPdf = ref(false);

// Local State untuk Salinan Item (Agar bisa diedit tanpa ubah props/database)
const localItems = ref<any[]>([]);

const resetLocalItems = () => {
  if (props.detailpenawaran?.penawaran_item) {
    localItems.value = JSON.parse(JSON.stringify(props.detailpenawaran.penawaran_item));
  } else {
    localItems.value = [];
  }
};

watch(
  () => props.detailpenawaran,
  () => {
    resetLocalItems();
  },
  { immediate: true, deep: true }
);

// Hitung Ulang Subtotal per Item saat Qty/Price diubah
const recalculateRow = (index: number) => {
  const item = localItems.value[index];
  if (item) {
    item.subtotal_item = (Number(item.qty) || 0) * (Number(item.amount) || 0);
  }
};

// Calculation Otomatis untuk Subtotal dan Grand Total Tampilan
const computedSubtotal = computed(() => {
  return localItems.value.reduce((acc, item) => acc + (Number(item.subtotal_item) || 0), 0);
});

const computedGrandTotal = computed(() => {
  return computedSubtotal.value;
});

const warnaTeksHeader = computed(() => {
  const hex = warnaBackgroundCustom.value.replace("#", "");
  if (hex.length !== 6) return "#ffffff";

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#0f172a" : "#ffffff";
});

const formatTanggal = (tanggal: string) => {
  if (!tanggal) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(tanggal));
};

const rubahtanggalpenawaran = (tgl: any) => formatTanggal(tgl);
const rupiah = (val: number) => new Intl.NumberFormat("id-ID").format(val || 0);

// 2. PERBARUI FUNGSI PRINT AGAR MEMAKAI printAreaRef
const handlePrint = () => {
  const printContents = printAreaRef.value?.innerHTML;
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
              font-family: 'Inter', Arial, sans-serif;
              height: 100%;
              margin: 0 !important;
              padding: 0 !important;
              background: #fff !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            .offer-card {
              box-shadow: none !important;
              width: 210mm !important;
              height: 297mm !important;
              margin: 0 !important;
              padding: 12mm 16mm 20mm 16mm !important;
              box-sizing: border-box !important;
              position: relative !important;
              overflow: hidden !important;
              page-break-after: avoid;
              page-break-before: avoid;
            }

            .no-print, .no-print-cell, .drag-icon {
              display: none !important;
            }

            .print-only-cell {
              display: table-cell !important;
            }

            .editable-input {
              border: none !important;
              background: transparent !important;
              outline: none !important;
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

  const images = doc.getElementsByTagName("img");
  const printAction = () => {
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 600);
  };

  if (images.length > 0) {
    let loaded = 0;
    for (let i = 0; i < images.length; i++) {
      images[i].onload = () => {
        loaded++;
        if (loaded === images.length) printAction();
      };
      images[i].onerror = () => {
        loaded++;
        if (loaded === images.length) printAction();
      };
    }
  } else {
    iframe.onload = printAction;
    printAction();
  }
};

// 3. PERBARUI JUGA FUNGSI SAVE PDF AGAR MEMAKAI printAreaRef
const handleSavePdf = async () => {
  const offerElement = printAreaRef.value;
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
    pdf.save(`${number.replace(/[^a-z0-9-_]/gi, "_")}.pdf`);
  } finally {
    isSavingPdf.value = false;
  }
};

// Fungsi Terbilang
const terbilang = (nilai: number): string => {
  const angka = Math.abs(Math.floor(nilai));
  const huruf = [
    "", "Satu", "Dua", "Tiga", "Empat", "Lima", 
    "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"
  ];
  let hasil = "";

  if (angka < 12) {
    hasil = " " + huruf[angka];
  } else if (angka < 20) {
    hasil = terbilang(angka - 10) + " Belas";
  } else if (angka < 100) {
    hasil = terbilang(Math.floor(angka / 10)) + " Puluh" + terbilang(angka % 10);
  } else if (angka < 200) {
    hasil = " Seratus" + terbilang(angka - 100);
  } else if (angka < 1000) {
    hasil = terbilang(Math.floor(angka / 100)) + " Ratus" + terbilang(angka % 100);
  } else if (angka < 2000) {
    hasil = " Seribu" + terbilang(angka - 1000);
  } else if (angka < 1000000) {
    hasil = terbilang(Math.floor(angka / 1000)) + " Ribu" + terbilang(angka % 1000);
  } else if (angka < 1000000000) {
    hasil = terbilang(Math.floor(angka / 1000000)) + " Juta" + terbilang(angka % 1000000);
  } else if (angka < 1000000000000) {
    hasil = terbilang(Math.floor(angka / 1000000000)) + " Miliar" + terbilang(angka % 1000000000);
  } else if (angka < 1000000000000000) {
    hasil = terbilang(Math.floor(angka / 1000000000000)) + " Triliun" + terbilang(angka % 1000000000000);
  }

  return hasil.trim();
};

const jadirupiah = (val: number) => {
  if (!val || isNaN(val)) return "Nol";
  return terbilang(val);
};
</script>

<style scoped>
/* Style Input Editable untuk Tabel Polos */
.editable-input {
  width: 100%;
  border: 1px dashed transparent;
  background: transparent;
  padding: 2px 4px;
  border-radius: 2px;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  transition: all 0.2s ease;
}

.editable-input:hover {
  border-color: #94a3b8;
  background-color: #f8fafc;
}

.editable-input:focus {
  border-color: #0284c7;
  background-color: #ffffff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.15);
}

.editable-input::-webkit-outer-spin-button,
.editable-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.editable-input[type="number"] {
  -moz-appearance: textfield;
}

.offer-card {
  width: 210mm;
  min-height: 297mm;
  padding: 15mm;
  margin: 0 auto;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  font-family: Arial, sans-serif;
  color: #000000;
  box-sizing: border-box;
}

.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.03;
  width: 400px;
  z-index: 0;
  pointer-events: none;
}
.watermark img {
  width: 100%;
}

.simple-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.company-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: #000;
}

.company-sub {
  font-size: 10px;
  margin: 0;
  color: #333;
  line-height: 1.3;
}

.simple-logo img {
  width: 75px;
  height: auto;
}

.simple-hr {
  border: none;
  border-top: 1px solid #000;
  margin: 12px 0 16px 0;
}

.content-body {
  position: relative;
  z-index: 1;
}

.simple-doc-title {
  text-align: center;
  margin-bottom: 16px;
}

.simple-doc-title h2 {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  text-decoration: underline;
}

.simple-doc-title p {
  font-size: 11px;
  margin: 4px 0 0 0;
}

.simple-info-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  margin-bottom: 16px;
}

.simple-info-table td {
  padding: 3px 2px;
  vertical-align: top;
}

.simple-info-table .label {
  color: #333;
}

.table-wrapper {
  margin-bottom: 16px;
}

.simple-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}

.simple-table th, 
.simple-table td {
  border: 1px solid #000000;
  padding: 6px;
}

.simple-table th {
  font-weight: bold;
  font-size: 10px;
}

.item-name {
  white-space: pre-line;
}

.text-sub {
  color: #333;
}

.simple-totals-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.simple-terbilang {
  flex: 1;
  font-size: 11px;
  border: 1px solid #000;
  padding: 8px;
}

.simple-calc-table {
  width: 220px;
  border-collapse: collapse;
  font-size: 11px;
}

.simple-calc-table td {
  border: 1px solid #000;
  padding: 6px;
}

.simple-calc-table .lbl {
  text-align: left;
}

.simple-calc-table .val {
  text-align: right;
}

.grand-row {
  background-color: #f2f2f2;
}

.drag-handle {
  cursor: grab;
  user-select: none;
}

.drag-icon {
  opacity: 0.3;
}

.row-num {
  color: #333;
}

.print-only-cell {
  display: none;
}

.closing-paragraph {
  font-size: 11px;
  line-height: 1.4;
  margin-bottom: 30px;
}

.simple-signatures {
  display: flex;
  justify-content: space-between;
  page-break-inside: avoid;
}

.sig-col {
  width: 40%;
  text-align: center;
  font-size: 11px;
}

.sig-col p {
  margin: 0;
}

.sig-company-name {
  font-weight: bold;
  margin-top: 2px !important;
}

.sig-space {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sig-img {
  max-height: 55px;
  max-width: 110px;
  object-fit: contain;
}

.sig-person {
  font-weight: bold;
}

.sig-role {
  font-size: 10px;
  color: #333;
}

.theme-btn {
  background: transparent !important;
  box-shadow: none !important;
}

:deep(.header-input-field input) {
  text-align: right !important;
  font-size: 10px !important;
  font-weight: bold !important;
  text-transform: uppercase;
  color: var(--header-text-color, #ffffff) !important;
  padding: 0 !important;
  min-height: unset !important;
}

:deep(.header-input-field .v-field__input) {
  padding: 0 !important;
  min-height: 18px !important;
}

@media print {
  .no-print {
    display: none !important;
  }
}

.document-actions {
  gap: 16px;
}

@media (max-width: 600px) {
  .document-actions {
    padding: 0 16px;
  }

  .quotation-action-btn {
    width: 100% !important;
  }
}
</style>