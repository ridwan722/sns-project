<script setup lang="ts">
import { doc } from "firebase/firestore";
import { useDocument, useFirestore } from "vuefire";
import type { penawaranM } from "~/types/penawaranModel";

definePageMeta({ layout: "admin" });

const route = useRoute();
const db = useFirestore();
const idPenawaran = computed(() => String(route.params.id));
const penawaranRef = computed(() => doc(db, "penawaran", idPenawaran.value));
const { data: penawaran, pending, error } = useDocument(penawaranRef);
const detailPenawaran = computed(() => penawaran.value as penawaranM | undefined);
const pengeluaran = computed(() => detailPenawaran.value?.pengeluaran ?? []);

const headers = [
  { title: "Tanggal", key: "tanggal_pengeluaran" },
  { title: "Keterangan", key: "keterangan" },
  { title: "Nominal", key: "nominal" },
  { title: "Qty", key: "qty" },
  { title: "Satuan", key: "satuan" },
  { title: "Vendor", key: "nama_vendor" },
  { title: "Telepon Vendor", key: "no_telp_vendor" },
  { title: "Lokasi Vendor", key: "lokasi_vendor" },
];
const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});
</script>

<template>
  <v-container fluid>
    <v-btn
      :to="`/admin/penawaran/${encodeURIComponent(idPenawaran)}`"
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="mb-4"
    >
      Kembali ke Penawaran
    </v-btn>
    <h1 class="text-h5 mb-2">Pengeluaran Penawaran</h1>
    <p class="text-body-2 mb-4">
      {{ detailPenawaran?.no_penawaran || idPenawaran }}
    </p>
    <v-alert v-if="error" type="error" class="mb-4">
      Gagal mengambil data pengeluaran penawaran.
    </v-alert>
    <v-alert v-else-if="!pending && !detailPenawaran" type="warning" class="mb-4">
      Penawaran tidak ditemukan.
    </v-alert>
    <v-data-table
      v-else
      :headers="headers"
      :items="pengeluaran"
      :loading="pending"
      item-value="id_pengeluaran"
      no-data-text="Belum ada pengeluaran untuk penawaran ini"
      loading-text="Memuat pengeluaran..."
      class="elevation-1"
    >
      <template #item.nominal="{ item }">
        {{ rupiah.format(item.nominal) }}
      </template>
    </v-data-table>
  </v-container>
</template>
