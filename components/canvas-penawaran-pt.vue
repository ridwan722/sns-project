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
      <!-- Top Accent Line -->
      <div class="top-accent-stripe" :style="{ backgroundColor: warnaBackgroundCustom }"></div>

      <!-- Watermark Background -->
      <div class="watermark">
        <img src="/public/Logo-SNS.png" alt="Logo Watermark" />
      </div>

      <!-- Header Section -->
      <div class="header-section">
        <div class="company-brand-left">
          <h1 class="company-name">PT. ABADI SEJAHTERA</h1>
          <p class="company-address">
            Permata Niaga, Jl. Jenderal Sudirman Blok A No. 1, Sukajadi,<br /> Batam Kota, Kota Batam, Kepulauan Riau 29462
             <br /> <strong>Telp/Hp:</strong> +62856 9247 8428
          </p>
        </div>
        <div class="logo-right-wrapper">
          <img src="/public/Logo-SNS.png" alt="Logo Header" />
        </div>
      </div>

      <div class="divider-line"></div>

      <!-- Content Body -->
      <div class="content-body">
        <!-- Title Banner -->
        <div class="title-banner-container">
          <div class="doc-badge-pill" :style="{ backgroundColor: warnaBackgroundCustom, color: warnaTeksHeader }">
            QUOTATION / PENAWARAN HARGA
          </div>
          <div class="doc-date-text">
            Batam, <strong>{{ rubahtanggalpenawaran(props.detailpenawaran.tanggal_penawaran) }}</strong>
          </div>
        </div>

        <!-- Metadata Cards -->
        <div class="metadata-3col">
          <div class="meta-card">
            <span class="card-label">NO. PENAWARAN</span>
            <span class="card-val highlight">{{ props.detailpenawaran.no_penawaran || "-" }}</span>
          </div>
          <div class="meta-card">
            <span class="card-label">KEPADA / CLIENT</span>
            <span class="card-val">{{ props.detailpenawaran.nama_perusahaan || "-" }}</span>
            <div class="card-sub-info">
              <span><strong>Attn:</strong> {{ props.detailpenawaran.pic || "-" }}</span>
              <span><strong>Telp:</strong> {{ props.detailpenawaran.no_telp || "-" }}</span>
            </div>
          </div>
          <div class="meta-card">
            <span class="card-label">PERIHAL / SUBJECT</span>
            <span class="card-val">{{ props.detailpenawaran.perihal || "-" }}</span>
            <div class="card-sub-info mt-1">
              <span><strong>Vessel:</strong> {{ props.detailpenawaran.vessel || "-" }}</span>
            </div>
          </div>
        </div>

        <!-- Table View -->
        <div class="table-wrapper">
          <table class="clean-table">
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
                :class="{ 'row-even': index % 2 === 1 }"
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

        <!-- Floating Summary Box Area -->
        <div class="summary-and-terbilang-wrapper">
          <div class="terbilang-floating-card">
            <span class="terbilang-title">TERBILANG</span>
            <p class="terbilang-body">
              # {{ jadirupiah(computedGrandTotal) }} Rupiah #
            </p>
          </div>

          <div class="calculation-summary-card">
            <div class="calc-row">
              <span class="calc-lbl">SUBTOTAL</span>
              <span class="calc-val">
                Rp {{ rupiah(computedSubtotal) }}
              </span>
            </div>
            <div class="calc-row grand-total" :style="{ borderLeftColor: warnaBackgroundCustom }">
              <span class="calc-lbl">GRAND TOTAL</span>
              <span class="calc-val price">
                Rp {{ rupiah(computedGrandTotal) }}
              </span>
            </div>
          </div>
        </div>

        <p class="closing-paragraph" v-if="showTable">
          Demikian penawaran harga ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.
        </p>

        <!-- Signature Section -->
        <div class="signatures-framed-container">
          <div class="sig-framed-box">
            <div class="sig-box-header">
              <p class="sig-header-text">Hormat Kami,</p>
              <p class="sig-comp-name">PT. ABADI SEJAHTERA</p>
            </div>
            <div class="sig-content-area">
              <img src="/public/ttd_ridwan.png" alt="Signature" class="sig-img" />
            </div>
            <div class="sig-box-footer">
              <p class="sig-name">Dzikril Agung Nugraha</p>
              <p class="sig-title">Authorized Signature</p>
            </div>
          </div>

          <div class="sig-framed-box">
            <div class="sig-box-header">
              <p class="sig-header-text">Disetujui Oleh,</p>
              <p class="sig-comp-name">{{ props.detailpenawaran.nama_perusahaan || "CLIENT COMPANY" }}</p>
            </div>
            <div class="sig-content-area"></div>
            <div class="sig-box-footer">
              <p class="sig-name">( .................................... )</p>
              <p class="sig-title">Stamp & Signature</p>
            </div>
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
        Print Quotation PT lain
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
    hasil = terbilang(Math.floor(angka / 10)) + " Puluh " + terbilang(angka % 10);
  } else if (angka < 200) {
    hasil = " Seratus " + terbilang(angka - 100);
  } else if (angka < 1000) {
    hasil = terbilang(Math.floor(angka / 100)) + " Ratus " + terbilang(angka % 100);
  } else if (angka < 2000) {
    hasil = " Seribu " + terbilang(angka - 1000);
  } else if (angka < 1000000) {
    hasil = terbilang(Math.floor(angka / 1000)) + " Ribu " + terbilang(angka % 1000);
  } else if (angka < 1000000000) {
    hasil = terbilang(Math.floor(angka / 1000000)) + " Juta " + terbilang(angka % 1000000);
  } else if (angka < 1000000000000) {
    hasil = terbilang(Math.floor(angka / 1000000000)) + " Miliar " + terbilang(angka % 1000000000);
  } else if (angka < 1000000000000000) {
    hasil = terbilang(Math.floor(angka / 1000000000000)) + " Triliun " + terbilang(angka % 1000000000000);
  }

  return hasil.trim();
};

const jadirupiah = (val: number) => {
  if (!val || isNaN(val)) return "Nol";
  return terbilang(val);
};
</script>

<style scoped>
/* Style Input yang bisa diedit */
.editable-input {
  width: 100%;
  border: 1px dashed transparent;
  background: transparent;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  transition: all 0.2s ease;
}

.editable-input:hover {
  border-color: #cbd5e1;
  background-color: #f8fafc;
}

.editable-input:focus {
  border-color: #0284c7;
  background-color: #ffffff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.15);
}

/* Hilangkan panah spinner angka pada input type=number */
.editable-input::-webkit-outer-spin-button,
.editable-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.editable-input[type="number"] {
  -moz-appearance: textfield;
}

/* Style Komponen Asli */
.offer-card {
  width: 210mm;
  min-height: 297mm;
  padding: 0 18mm 20mm 18mm;
  margin: 0 auto;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #1e293b;
  box-sizing: border-box;
}

.top-accent-stripe {
  height: 6px;
  width: 100%;
  margin-bottom: 16mm;
  transition: background-color 0.2s ease;
}

.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.04;
  width: 500px;
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
}

.company-name {
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.3px;
  margin: 0 0 4px 0;
}

.company-address {
  font-size: 9px;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
}

.logo-right-wrapper img {
  width: 90px;
  height: auto;
  display: block;
}

.divider-line {
  height: 1px;
  background: #e2e8f0;
  margin: 14px 0;
}

.content-body {
  position: relative;
  z-index: 1;
}

.title-banner-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.doc-badge-pill {
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.doc-date-text {
  font-size: 10.5px;
  color: #475569;
}

.metadata-3col {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr;
  gap: 10px;
  margin-bottom: 16px;
}

.meta-card {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
}

.card-label {
  font-size: 8.5px;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.card-val {
  font-size: 11px;
  font-weight: 700;
  color: #0f172a;
}

.card-val.highlight {
  color: #0284c7;
}

.card-sub-info {
  display: flex;
  flex-direction: column;
  font-size: 9.5px;
  color: #475569;
  margin-top: 4px;
  gap: 2px;
}

.table-wrapper {
  margin-bottom: 12px;
}

.clean-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
}

.clean-table th {
  padding: 8px 10px;
  font-weight: 700;
  font-size: 8.5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.clean-table td {
  padding: 8px 10px;
  color: #334155;
  vertical-align: middle;
  border-bottom: 1px solid #f1f5f9;
}

.clean-table tbody tr.row-even {
  background-color: #f8fafc;
}

.item-name {
  white-space: pre-line;
  color: #0f172a;
}

.text-sub {
  color: #64748b;
}

.summary-and-terbilang-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.terbilang-floating-card {
  flex: 1;
  background: #f8fafc;
  border-left: 3px solid #cbd5e1;
  padding: 8px 12px;
  border-radius: 0 6px 6px 0;
}

.terbilang-title {
  font-size: 8.5px;
  font-weight: 800;
  color: #64748b;
  letter-spacing: 0.5px;
}

.terbilang-body {
  margin: 2px 0 0 0;
  font-size: 10px;
  font-weight: 700;
  font-style: italic;
  color: #0f172a;
}

.calculation-summary-card {
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.calc-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  padding: 4px 8px;
}

.calc-row.grand-total {
  background: #f8fafc;
  border-left: 3px solid #0f172a;
  border-radius: 0 4px 4px 0;
  padding: 6px 8px;
}

.calc-lbl {
  font-weight: 700;
  color: #64748b;
}

.calc-val {
  font-weight: 700;
  color: #0f172a;
}

.calc-val.price {
  font-size: 11.5px;
}

.drag-handle {
  cursor: grab;
  user-select: none;
}

.drag-icon {
  opacity: 0.3;
}

.row-num {
  color: #64748b;
  font-weight: 500;
}

.print-only-cell {
  display: none;
}

.closing-paragraph {
  font-size: 10.5px;
  color: #475569;
  line-height: 1.4;
  margin-bottom: 20px;
}

.signatures-framed-container {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  page-break-inside: avoid;
}

.sig-framed-box {
  flex: 1;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 160px;
  overflow: hidden;
}

.sig-box-header {
  background: #f8fafc;
  padding: 6px 10px;
  border-bottom: 1px solid #e2e8f0;
  text-align: center;
}

.sig-header-text {
  font-size: 9.5px;
  color: #64748b;
  margin: 0;
}

.sig-comp-name {
  font-size: 9.5px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  text-transform: uppercase;
}

.sig-content-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
}

.sig-img {
  max-height: 65px;
  max-width: 110px;
  object-fit: contain;
}

.sig-box-footer {
  padding: 6px 10px;
  text-align: center;
  border-top: 1px dashed #e2e8f0;
}

.sig-name {
  font-size: 10px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.sig-title {
  font-size: 8.5px;
  color: #64748b;
  margin: 0;
}

.theme-btn {
  background: transparent !important;
  box-shadow: none !important;
}

:deep(.header-input-field input) {
  text-align: right !important;
  font-size: 8.5px !important;
  font-weight: 700 !important;
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