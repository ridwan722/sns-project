<script setup lang="ts">
import { doc } from "firebase/firestore";
import { useDocument, useFirestore } from "vuefire";
import type { penawaranM } from "~/types/penawaranModel";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const db = useFirestore();

const idPenawaran = computed(() => String(route.params.id));

const penawaranRef = computed(() =>
  doc(db, "penawaran", idPenawaran.value),
);

const {
  data: penawaran,
  pending,
  error,
} = useDocument(penawaranRef);

const detailPenawaran = computed(
  () => penawaran.value as penawaranM | undefined,
);

const pengeluaran = computed(
  () => detailPenawaran.value?.pengeluaran ?? [],
);

/* =====================================================
   TABLE HEADER
===================================================== */

const headers = [
  {
    title: "NO",
    key: "no",
    width: "55px",
    sortable: false,
  },
  {
    title: "TANGGAL",
    key: "tanggal_pengeluaran",
    width: "120px",
  },
  {
    title: "KETERANGAN",
    key: "keterangan",
    minWidth: "220px",
  },
  {
    title: "NOMINAL",
    key: "nominal",
    align: "end",
    width: "150px",
  },
  {
    title: "QTY",
    key: "qty",
    width: "90px",
  },
  {
    title: "VENDOR",
    key: "nama_vendor",
    minWidth: "160px",
  },
  {
    title: "TELEPON",
    key: "no_telp_vendor",
    minWidth: "140px",
  },
  {
    title: "LOKASI",
    key: "lokasi_vendor",
    minWidth: "170px",
  },

  {
    title: "Dikeluarkan oleh",
    key: "dikeluarkan_oleh",
    align: "end",
    width: "150px",
  },
];

/* =====================================================
   FORMAT
===================================================== */

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const totalPengeluaran = computed(() => {
  return pengeluaran.value.reduce(
    (total, item) => total + Number(item.nominal || 0),
    0,
  );
});

const formatTanggal = (tanggal: string) => {
  if (!tanggal) return "-";

  const date = new Date(tanggal);

  if (Number.isNaN(date.getTime())) {
    return tanggal;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
</script>

<template>
  <v-container fluid class="expense-page pa-4 pa-md-5">
    <!-- =================================================
         HEADER
    ================================================== -->

    <div class="page-header mb-4">
      <div class="d-flex align-center mb-3">
        <v-btn
          icon="mdi-arrow-left"
          variant="tonal"
          color="grey-darken-2"
          size="small"
          class="back-button mr-3"
          @click="$router.go(-1)"
        />

        <div>
          <div class="page-eyebrow">
            PROJECT EXPENSE
          </div>

          <h1 class="page-title">
            Pengeluaran Project
          </h1>
        </div>
      </div>

      <!-- =================================================
           PROJECT INFORMATION
      ================================================== -->

      <v-card
        class="project-card"
        elevation="0"
      >
        <div class="project-content">
          <div class="project-main">
            <div class="project-label">
              PROJECT
            </div>

            <div class="project-title">
              {{ detailPenawaran?.perihal || "Memuat data..." }}
            </div>

            <div class="company-name">
              <v-icon
                icon="mdi-domain"
                size="15"
                class="mr-1"
              />

              {{ detailPenawaran?.nama_perusahaan || "-" }}
            </div>
          </div>

          <div class="project-reference">
            <div class="reference-label">
              NO. REFERENSI
            </div>

            <div class="reference-number">
              {{ detailPenawaran?.no_penawaran || idPenawaran }}
            </div>
          </div>
        </div>
      </v-card>
    </div>

    <!-- =================================================
         SUMMARY
    ================================================== -->

    <div class="summary-grid mb-4">
      <!-- TOTAL PENGELUARAN -->

      <v-card
        class="summary-card summary-primary"
        elevation="0"
      >
        <div class="summary-icon">
          <v-icon
            icon="mdi-cash-minus"
            size="19"
          />
        </div>

        <div class="summary-info">
          <div class="summary-label">
            TOTAL PENGELUARAN
          </div>

          <div class="summary-value">
            {{ rupiah.format(totalPengeluaran) }}
          </div>
        </div>
      </v-card>

      <!-- JUMLAH TRANSAKSI -->

      <v-card
        class="summary-card"
        elevation="0"
      >
        <div class="summary-icon neutral">
          <v-icon
            icon="mdi-receipt-text-outline"
            size="19"
          />
        </div>

        <div class="summary-info">
          <div class="summary-label">
            JUMLAH TRANSAKSI
          </div>

          <div class="summary-value">
            {{ pengeluaran.length }}

            <span class="summary-unit">
              transaksi
            </span>
          </div>
        </div>
      </v-card>
    </div>

    <!-- =================================================
         ALERT ERROR
    ================================================== -->

    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="mb-4 corporate-alert"
      icon="mdi-alert-circle-outline"
    >
      <div class="font-weight-medium">
        Gagal mengambil data pengeluaran.
      </div>

      <div class="text-caption mt-1">
        Silakan refresh halaman atau coba kembali beberapa saat lagi.
      </div>
    </v-alert>

    <!-- =================================================
         ALERT DATA TIDAK DITEMUKAN
    ================================================== -->

    <v-alert
      v-else-if="!pending && !detailPenawaran"
      type="warning"
      variant="tonal"
      class="mb-4 corporate-alert"
      icon="mdi-alert-outline"
    >
      <div class="font-weight-medium">
        Data penawaran tidak ditemukan.
      </div>
    </v-alert>

    <!-- =================================================
         TABLE
    ================================================== -->

    <v-card
      v-else
      class="table-card"
      elevation="0"
    >
      <!-- TABLE HEADER -->

      <div class="table-header">
        <div>
          <div class="table-title">
            Daftar Pengeluaran
          </div>

          <div class="table-subtitle">
            Rincian biaya yang tercatat pada project ini
          </div>
        </div>

        <v-chip
          variant="tonal"
          size="small"
          prepend-icon="mdi-format-list-bulleted"
          class="transaction-chip"
        >
          {{ pengeluaran.length }} transaksi
        </v-chip>
      </div>

      <v-divider />

      <!-- TABLE WRAPPER -->

      <div class="table-wrapper">
        <v-data-table
          :headers="headers"
          :items="pengeluaran"
          :loading="pending"
          item-value="id_pengeluaran"
          density="comfortable"
          hover
          class="corporate-table"
          hide-default-footer
        >
          <!-- LOADING -->

          <template #loading>
            <v-skeleton-loader
              type="table-row@6"
              class="pa-4"
            />
          </template>

          <!-- EMPTY -->

          <template #no-data>
            <div class="empty-state">
              <div class="empty-icon">
                <v-icon
                  icon="mdi-receipt-text-outline"
                  size="30"
                />
              </div>

              <div class="empty-title">
                Belum ada pengeluaran
              </div>

              <div class="empty-description">
                Belum terdapat data pengeluaran untuk project ini.
              </div>
            </div>
          </template>

          <!-- NOMOR -->

          <template #item.no="{ index }">
            <span class="row-number">
              {{ String(index + 1).padStart(2, "0") }}
            </span>
          </template>

          <!-- TANGGAL -->

          <template #item.tanggal_pengeluaran="{ item }">
            <div class="date-cell">
              {{ formatTanggal(item.tanggal_pengeluaran) }}
            </div>
          </template>

          <!-- KETERANGAN -->

          <template #item.keterangan="{ item }">
            <div class="description-cell">
              {{ item.keterangan || "-" }}
            </div>
          </template>

          <!-- NOMINAL -->

          <template #item.nominal="{ item }">
            <div class="nominal-cell">
              {{ rupiah.format(Number(item.nominal || 0)) }}
            </div>
          </template>

          <!-- QTY -->

          <template #item.qty="{ item }">
            <div class="qty-cell">
              <span class="qty-number">
                {{ item.qty ?? 0 }}
              </span>

              <span class="qty-unit">
                {{ item.satuan || "-" }}
              </span>
            </div>
          </template>

          <!-- VENDOR -->

          <template #item.nama_vendor="{ item }">
            <div class="vendor-cell">
              <div class="vendor-icon">
                <v-icon
                  icon="mdi-store-outline"
                  size="15"
                />
              </div>

              <span>
                {{ item.nama_vendor || "-" }}
              </span>
            </div>
          </template>

          <!-- TELEPON -->

          <template #item.no_telp_vendor="{ item }">
            <a
              v-if="item.no_telp_vendor"
              :href="`tel:${item.no_telp_vendor}`"
              class="phone-link"
            >
              <v-icon
                icon="mdi-phone-outline"
                size="14"
                class="mr-1"
              />

              {{ item.no_telp_vendor }}
            </a>

            <span
              v-else
              class="text-disabled"
            >
              -
            </span>
          </template>

          <!-- LOKASI -->

          <template #item.lokasi_vendor="{ item }">
            <div class="location-cell">
              <v-icon
                icon="mdi-map-marker-outline"
                size="15"
                class="mr-1"
              />

              <span>
                {{ item.lokasi_vendor || "-" }}
              </span>
            </div>
          </template>
        </v-data-table>
      </div>

      <!-- =================================================
           TABLE FOOTER
      ================================================== -->

      <v-divider />

      <div class="table-footer">
        <span class="footer-label">
          Total Pengeluaran
        </span>

        <span class="footer-total">
          {{ rupiah.format(totalPengeluaran) }}
        </span>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
/* =====================================================
   PAGE
===================================================== */

.expense-page {
  max-width: 1800px;
  margin: 0 auto;
  color: #1f2937;
}

/* =====================================================
   PAGE HEADER
===================================================== */

.page-header {
  width: 100%;
}

.back-button {
  border-radius: 8px;
}

.page-eyebrow {
  font-size: 9px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 1.2px;
  color: #9ca3af;
  margin-bottom: 3px;
}

.page-title {
  margin: 0;
  font-size: 21px;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.2px;
  color: #111827;
}

/* =====================================================
   PROJECT CARD
===================================================== */

.project-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
}

.project-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 78px;
  padding: 14px 18px;
}

.project-main {
  min-width: 0;
}

.project-label,
.reference-label {
  font-size: 9px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: #9ca3af;
  margin-bottom: 5px;
}

.project-title {
  font-size: 15px;
  line-height: 1.3;
  font-weight: 650;
  color: #111827;
  word-break: break-word;
}

.company-name {
  display: flex;
  align-items: center;
  margin-top: 4px;
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
}

.project-reference {
  flex-shrink: 0;
  min-width: 160px;
  padding-left: 20px;
  margin-left: 20px;
  border-left: 1px solid #e5e7eb;
}

.reference-number {
  font-family: monospace;
  font-size: 12px;
  font-weight: 700;
  color: #374151;
}

/* =====================================================
   SUMMARY
===================================================== */

.summary-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 10px;
}

.summary-card {
  min-height: 72px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
}

.summary-primary {
  background: #fafbfc;
  border-color: #e1e5ea;
}

.summary-icon {
  width: 36px;
  height: 36px;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: #eef2f6;
  color: #526b84;
}

.summary-icon.neutral {
  background: #f3f4f6;
  color: #6b7280;
}

.summary-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: #9ca3af;
  margin-bottom: 3px;
}

.summary-value {
  font-size: 16px;
  line-height: 1.2;
  font-weight: 700;
  color: #111827;
}

.summary-unit {
  font-size: 10px;
  font-weight: 500;
  color: #9ca3af;
}

/* =====================================================
   ALERT
===================================================== */

.corporate-alert {
  border-radius: 8px !important;
}

/* =====================================================
   TABLE CARD
===================================================== */

.table-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  overflow: hidden;
}

.table-header {
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 18px;
}

.table-title {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.table-subtitle {
  margin-top: 2px;
  font-size: 11px;
  color: #9ca3af;
}

.transaction-chip {
  font-size: 11px !important;
  flex-shrink: 0;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

/* =====================================================
   DATA TABLE
===================================================== */

.corporate-table {
  min-width: 1050px;
}

.corporate-table :deep(th) {
  height: 42px !important;
  background: #f8fafc !important;
  border-bottom: 1px solid #e5e7eb !important;
  color: #6b7280 !important;
  font-size: 9px !important;
  font-weight: 700 !important;
  letter-spacing: 0.6px;
  white-space: nowrap;
}

.corporate-table :deep(td) {
  height: 52px !important;
  border-bottom: 1px solid #f0f1f3 !important;
  color: #374151;
  font-size: 12px;
}

.corporate-table :deep(tbody tr:hover) {
  background: #fafbfc !important;
}

.corporate-table :deep(tbody tr:last-child td) {
  border-bottom: none !important;
}

/* =====================================================
   TABLE CELLS
===================================================== */

.row-number {
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  font-variant-numeric: tabular-nums;
}

.date-cell {
  font-size: 11px;
  color: #4b5563;
  white-space: nowrap;
}

.description-cell {
  max-width: 320px;
  line-height: 1.4;
  font-weight: 500;
  color: #374151;
}

.nominal-cell {
  font-size: 12px;
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.qty-cell {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 5px;
  background: #f3f4f6;
  white-space: nowrap;
}

.qty-number {
  font-size: 11px;
  font-weight: 700;
  color: #374151;
}

.qty-unit {
  font-size: 10px;
  color: #6b7280;
}

.vendor-cell {
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: 500;
}

.vendor-icon {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 6px;
  background: #f3f4f6;
  color: #6b7280;
}

.phone-link {
  display: inline-flex;
  align-items: center;
  color: #526b84;
  text-decoration: none;
  white-space: nowrap;
  font-size: 11px;
}

.phone-link:hover {
  text-decoration: underline;
}

.location-cell {
  display: flex;
  align-items: center;
  color: #6b7280;
  font-size: 11px;
  line-height: 1.4;
}

/* =====================================================
   EMPTY STATE
===================================================== */

.empty-state {
  padding: 45px 20px;
  text-align: center;
}

.empty-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  border-radius: 10px;
  background: #f3f4f6;
  color: #9ca3af;
}

.empty-title {
  font-size: 13px;
  font-weight: 700;
  color: #374151;
}

.empty-description {
  margin-top: 3px;
  font-size: 11px;
  color: #9ca3af;
}

/* =====================================================
   TABLE FOOTER
===================================================== */

.table-footer {
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 10px 18px;
  background: #fafbfc;
}

.footer-label {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
}

.footer-total {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

/* =====================================================
   TABLET
===================================================== */

@media (max-width: 959px) {
  .expense-page {
    padding: 14px !important;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .project-content {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }

  .project-reference {
    width: 100%;
    min-width: 0;
    padding-left: 0;
    padding-top: 12px;
    margin-left: 0;
    border-left: none;
    border-top: 1px solid #e5e7eb;
  }
}

/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 600px) {
  .expense-page {
    padding: 10px !important;
  }

  .page-title {
    font-size: 19px;
  }

  .page-eyebrow {
    font-size: 8px;
  }

  .project-content {
    padding: 14px;
  }

  .project-title {
    font-size: 14px;
  }

  .company-name {
    font-size: 10px;
  }

  .summary-card {
    min-height: 64px;
    padding: 10px 13px;
    gap: 10px;
  }

  .summary-icon {
    width: 32px;
    height: 32px;
    min-width: 32px;
  }

  .summary-label {
    font-size: 8px;
  }

  .summary-value {
    font-size: 14px;
  }

  .table-header {
    align-items: flex-start;
    flex-direction: column;
    padding: 13px 14px;
  }

  .transaction-chip {
    align-self: flex-start;
  }

  .table-footer {
    justify-content: space-between;
    padding: 10px 14px;
  }

  .footer-total {
    font-size: 13px;
  }
}
</style>