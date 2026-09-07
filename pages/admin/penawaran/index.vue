<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <!-- Tombol Kembali -->
  <v-btn
    variant="text"
    color="grey-darken-3"
    prepend-icon="mdi-arrow-left"
    @click="$router.go(-1)"
    class="text-capitalize font-weight-bold mb-2"
  >
    Kembali
  </v-btn>

  <!-- Dialog Tambah / Edit Quotation -->
  <v-dialog
    v-model="data.dialogTambahPenawaran"
    max-width="800"
    scrollable
    fullscreen-sm-and-down
  >
    <v-card class="rounded-xl-md overflow-hidden elevation-3 border-0">
      <v-card-item class="bg-grey-lighten-4 pa-4 text-center">
        <h4 class="font-weight-bold text-grey-darken-3 text-h6 text-sm-h5">
          {{ data.penawaranAddEdit === "add" ? "Create" : "Edit" }} Quotation
        </h4>
        <p class="text-caption text-grey-darken-1 m-0">
          Lengkapi rincian penawaran harga dan item pekerjaan di bawah ini.
        </p>
      </v-card-item>

      <v-card-text class="pa-4 pa-sm-6">

        <v-row>
          <v-col>
            <a-select-new
              v-model="newPenawaran.id_perusahaan"
              label="Client"
              placeholder="Select"
              item-title="nama"
              item-value="id"
              :items="customerStore.getDataCustomer"
            />
          </v-col>
          <v-col>
            <a-date-picker-new
              v-model="newPenawaran.tanggal_penawaran"
              label="Quotation Date"
            />
          </v-col>
        </v-row>
        <a-text-field-new
          class="mt-2"
          v-model="newPenawaran.alamat_perusahaan"
          label="Address"
          disabled
          placeholder="*Auto"
        />
        <v-row no-gutters>
          <v-col cols="6" md="3" class="pa-1">
            <a-text-field-new
              v-model="newPenawaran.pic"
              label="PIC"
              disabled
              placeholder="*Auto"
            />
          </v-col>
          <v-col cols="6" md="3" class="pa-1">
            <a-text-field-new
              v-model="newPenawaran.no_telp"
              label="Phone Number"
              disabled
              placeholder="*Auto"
            />
          </v-col>
          <v-col cols="6" md="3" class="pa-1">
            <a-text-field-new
              v-model="newPenawaran.email"
              label="Email"
              disabled
              placeholder="@gmail.com"
            />
          </v-col>
          <v-col cols="6" md="3" class="pa-1">
            <a-text-field-new
              v-model="newPenawaran.vessel"
              label="Vessel"
              disabled
              placeholder="*Auto"
            />
          </v-col>
        </v-row>

        <v-divider class="my-4 border-opacity-50" />

        <a-textarea-new
          v-model="newPenawaran.perihal"
          label="Subject"
          placeholder="Quotation Subject"
          rows="2"
        />

        <!-- Section: Rincian Item -->
        <div class="d-flex align-center justify-space-between mb-3">
          <span class="text-subtitle-2 font-weight-bold text-primary">
            Rincian Item & Penawaran
          </span>
        </div>

        <!-- Loop Item Penawaran -->
        <v-row
          v-for="(item, index) in newPenawaran.penawaran_item"
          :key="index"
          class="bg-grey-lighten-5 rounded-lg pa-3 pa-sm-4 mb-4 border border-dashed position-relative"
        >
          <v-col cols="11">
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-body-1 font-weight-bold text-primary"
                >#{{ index + 1 }}.</span
              >
            </div>

            <a-textarea-new
              v-model="item.nama"
              label="Description"
              placeholder="Description"
            />

            <v-row density="compact">
              <v-col cols="6" sm="2">
                <a-field-number-new
                  v-model="item.qty"
                  label="Qty"
                  placeholder="0"
                />
              </v-col>
              <v-col cols="6" sm="2">
                <a-select-new
                  :items="['Unit', 'Pcs', 'Kg', 'Lot', 'Lumpsum']"
                  v-model="item.uom"
                  label="UOM"
                  placeholder="Select"
                />
              </v-col>
              <v-col cols="12" sm="2">
                <a-field-number-new
                  v-model="item.harga_hpp"
                  label="HPP"
                  placeholder="0"
                />
              </v-col>
              <v-col cols="12" sm="3">
                <a-field-number-new
                  v-model="item.amount"
                  label="Amount/Pcs (Rp)"
                  placeholder="0"
                />
              </v-col>
              <v-col cols="12" sm="3">
                <a-text-field-new
                  :model-value="
                    (
                      Number(item.qty || 0) * Number(item.amount || 0)
                    ).toLocaleString('id-ID')
                  "
                  label="Subtotal"
                  placeholder="0"
                  disabled
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-btn
              icon="mdi-trash-can-outline"
              size="x-small"
              variant="outlined"
              color="error"
              style="border-radius: 8px; height: 100%"
              @mouseover="
                $event.currentTarget.style.backgroundColor = '#ffebee'
              "
              @mouseout="
                $event.currentTarget.style.backgroundColor = 'transparent'
              "
              @click="hapusBarisPenawaran(index)"
            />
          </v-col>
        </v-row>

        <div class="text-center">
          <v-btn
            size="small"
            variant="flat"
            color="primary"
            prepend-icon="mdi-plus"
            class="text-none font-weight-semibold rounded-lg"
            @click="tambahBarisPenawaran"
          >
            Tambah Baris
          </v-btn>
        </div>

        <v-divider class="my-4 border-opacity-50" />

        <!-- Section: Ringkasan Biaya -->
        <div class="text-subtitle-2 font-weight-bold text-primary mb-3">
          Ringkasan Biaya
        </div>

        <v-card variant="flat" class="bg-blue-grey-lighten-5 rounded-xl pa-4">
          <div class="d-flex justify-space-between align-center">
            <span class="text-subtitle-1 font-weight-bold text-grey-darken-4"
              >Total</span
            >
            <span class="text-h6 text-sm-h5 font-weight-black text-primary">
              Rp {{ rupiah(subtotalPenawaran) }}
            </span>
          </div>
        </v-card>

        <div class="mt-4">
          <span class="text-caption">
            <strong>TERMS &amp; CONDITIONS:</strong>
          </span>

          <table
  style="
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
    border: 1px solid #9CA3AF;
  "
>
  <tbody>
    <tr
      v-for="(item, index) in termconditionStore.getDataTermcondition"
      :key="item.id ?? index"
    >
      <td
        style="
          width: 25px;
          padding: 3px 5px;
          vertical-align: top;
          text-align: center;
          border: 1px solid #9CA3AF;
        "
      >
        {{ index + 1 }}.
      </td>

      <td
        style="
          width: 30px;


          border: 1px solid #9CA3AF;

        "
      >
        <v-checkbox
          v-model="newPenawaran.termCondition"
          :value="{ id: item.id ?? '', nama_term: item.nama_term }"
          :value-comparator="sameTermCondition"
          density="compact"
          hide-details
          color="primary"
          style="
            margin: -6px 0 0 0;
            padding: 0;
            transform: scale(0.7);
            transform-origin: center;
          "
        />
      </td>

      <td
        style="
          padding: 4px 6px;
          vertical-align: top;
          line-height: 1.4;
          border: 1px solid #9CA3AF;
        "
      >
        {{ item.nama_term }}
      </td>
    </tr>
  </tbody>
</table>
        </div>
      </v-card-text>

      <v-divider />
      <v-card-actions class="pa-4">
        <v-spacer class="hidden-xs-only" />
        <v-btn
          size="small"
          variant="outlined"
          color="grey-darken-1"
          class="flex-grow-1 flex-sm-grow-0"
          @click="data.dialogTambahPenawaran = false"
        >
          Batal
        </v-btn>
        <v-btn
          size="small"
          color="primary"
          variant="flat"
          class="font-weight-bold flex-grow-1 flex-sm-grow-0"
          @click="simpanPenawaranDialog"
        >
          {{ data.penawaranAddEdit === "add" ? "Save" : "Edit" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Header & Top Action -->
  <div
    class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center mb-4 gap-2"
  >
    <h1 class="text-h5 font-weight-bold my-0">Penawaran</h1>
    <v-btn
      color="primary"
      variant="flat"
      size="small"
      class="text-capitalize w-100 w-sm-auto"
      prepend-icon="mdi-plus"
      @click="openDialogTambahPenawaran"
    >
      Create New Quotation
    </v-btn>
  </div>

  <!-- Main Table Card -->
  <v-card class="border rounded-lg" flat>
    <v-card-title class="pa-3 pa-sm-4">
      <div class="d-flex align-center gap-2">
        <div class="flex-grow-1">
          <a-text-field-new
            v-model="data.searchPenawaran"
            placeholder="Cari no. penawaran / customer"
            hide-details
            density="compact"
          />
        </div>
        <v-btn
          size="38"
          variant="outlined"
          class="border flex-shrink-0"
          @click="refreshData"
        >
          <v-icon size="20" icon="mdi-refresh" />
          <v-tooltip activator="parent" location="top">
            Refresh Data
          </v-tooltip>
        </v-btn>
      </div>
    </v-card-title>

    <v-divider />

    <!-- Responsive Table -->
    <v-data-table
      :headers="data.headPenawaran"
      :items="penawaranStore.getDataPenawaran"
      :search="data.searchPenawaran"
      density="compact"
      :sort-by="[{ key: 'created_at', order: 'desc' }]"
      :hover="true"
      class="text-no-wrap"
    >
      <template v-slot:item.no="{ index }"> {{ index + 1 }}</template>

      <template v-slot:item.no_penawaran="{ item }">
        <NuxtLink
          :to="'/admin/penawaran/' + item.id"
          class="penawaran-link font-weight-medium"
        >
          {{ item.no_penawaran }}
        </NuxtLink>
      </template>

      <template v-slot:item.tanggal_penawaran="{ item }">
        {{ rubahtanggallengkap(item.tanggal_penawaran) }}
      </template>

      <template v-slot:item.grand_total="{ item }">
        Rp {{ rupiah(item.grand_total_penawaran) }}
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip
          size="x-small"
          :color="statusColor(item.status)"
          variant="flat"
          class="font-weight-bold"
        >
          {{ item.status }}
        </v-chip>
      </template>

      <template v-slot:item.aksi="{ item }">
        <div class="d-flex justify-center align-center">
          <v-btn
            size="28"
            variant="tonal"
            color="info"
            class="rounded-lg mr-1"
            :to="'/admin/penawaran/' + item.id"
          >
            <v-icon size="16" icon="mdi-eye" />
            <v-tooltip activator="parent" location="top"
              >Detail Penawaran</v-tooltip
            >
          </v-btn>

          <v-btn
            :disabled="item.status !== 'Draft'"
            size="28"
            variant="tonal"
            color="warning"
            class="rounded-lg mr-1"
            @click="openDialogEditPenawaran(item)"
          >
            <v-icon size="16" icon="mdi-pencil-outline" />
            <v-tooltip activator="parent" location="top"
              >Edit Penawaran</v-tooltip
            >
          </v-btn>

          <v-btn
            size="28"
            variant="tonal"
            color="grey"
            class="rounded-lg"
            @click="hapusPenawaran(item)"
          >
            <v-icon size="16" icon="mdi-trash-can-outline" />
            <v-tooltip activator="parent" location="top">Hapus</v-tooltip>
          </v-btn>
        </div>
      </template>

      <template v-slot:no-data>
        <div class="py-8 text-center text-grey-darken-1">
          <v-icon
            size="48"
            color="grey-lighten-1"
            class="mb-2"
            icon="mdi-file-document-edit-outline"
          />
          <div class="text-body-1">Belum ada data Penawaran</div>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
import type { ConfirmationDialog } from "#components";
import type { penawaranM } from "~/types/penawaranModel";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const customerStore = usecustomerStore();
const termconditionStore = usetermconditionStore();
const penawaranStore = usePenawaranStore();
const invoiceStore = useinvoiceStore();
const userStore = useUserStore();
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(
  null,
);

onMounted(async () => {
  await customerStore.tarikDataCustomerAct();
  await penawaranStore.tarikDataPenawaranAct();
  await termconditionStore.tarikDataTermconditionAct();
});

const data = reactive({
  searchPenawaran: "",

  dialogTambahPenawaran: false,
  penawaranAddEdit: "add" as "add" | "edit",
  editOriginalCustomerId: "",
  editOriginalTermconditionId: "",
  headPenawaran: [
    { title: "No", value: "no", width: "10px" },
    { title: "Date", value: "tanggal_penawaran", sortable: true },
    { title: "Quotation Ref No", value: "no_penawaran", sortable: true },
    { title: "Client", value: "nama_perusahaan", sortable: true },
    { title: "Subject", value: "perihal", sortable: true },
    { title: "Total Amount", value: "grand_total", sortable: true },
    { title: "Status", value: "status", sortable: true },
    { title: "Aksi", align: "center" as const, value: "aksi", width: "120px" },
  ],
});

function emptyPenawaran(): penawaranM {
  const generatedNo = generateNoPenawaran();
  return {
    no_penawaran: generatedNo,
    id_perusahaan: "",
    pic: "",
    vessel: "",
    nama_perusahaan: "",
    alamat_perusahaan: "",
    no_telp: "",
    email: "",
    tanggal_penawaran: moment().format("YYYY-MM-DD"),
    created_at: 0,
    created_by: "",
    status: "Draft",
    perihal: "",
    penawaran_item: [
      {
        nama: "",
        qty: 1,
        uom: "Unit",
        amount: 0,
        subtotal_item: 0,
        harga_hpp: 0,
      },
    ],
    subtotal_penawaran: 0,
    grand_total_penawaran: 0,
    terbilang: "",
    id_termcondition: "",
    nama_term: "",
    termCondition: [],
  };
}

function generateNoPenawaran(): string {
  const year = moment().format("YYYY");
  const pattern = new RegExp(`^QT/ICI/${year}/SNS/(\\d{5})$`);
  const lastSequence = (penawaranStore.getDataPenawaran || []).reduce(
    (highest, penawaran) => {
      const match = penawaran.no_penawaran?.match(pattern);
      return match ? Math.max(highest, Number(match[1])) : highest;
    },
    0,
  );

  return `QT/SNS/${year}/${String(lastSequence + 1).padStart(5, "0")}`;
}

const newPenawaran = ref<penawaranM>(emptyPenawaran());

function sameTermCondition(
  left: NonNullable<penawaranM['termCondition']>[number],
  right: NonNullable<penawaranM['termCondition']>[number],
) {
  return left.id && right.id
    ? left.id === right.id
    : left.nama_term === right.nama_term;
}

const subtotalPenawaran = computed(() =>
  newPenawaran.value.penawaran_item.reduce(
    (total, item) =>
      total + (Number(item.qty) || 0) * (Number(item.amount) || 0),
    0,
  ),
);

watch(
  () => newPenawaran.value.id_perusahaan,
  (idCustomer) => {
    if (
      data.penawaranAddEdit === "edit" &&
      idCustomer === data.editOriginalCustomerId
    ) {
      return;
    }
    const customer = customerStore.getDataCustomer.find(
      (item: any) => item.id === idCustomer,
    );
    if (!customer) return;
    newPenawaran.value.id_perusahaan = customer.id ?? "";
    newPenawaran.value.nama_perusahaan = customer.nama;
    newPenawaran.value.alamat_perusahaan = customer.alamat;
    newPenawaran.value.pic = customer.pic;
    newPenawaran.value.no_telp = customer.no_telp;
    newPenawaran.value.vessel = customer.vessel;
    newPenawaran.value.email = customer.email;
  },
);

watch(
  () => newPenawaran.value.id_termcondition,
  (idTermcondition) => {
    if (
      data.penawaranAddEdit === "edit" &&
      idTermcondition === data.editOriginalTermconditionId
    ) {
      return;
    }
    const termcondition = termconditionStore.getDataTermcondition.find(
      (item: any) => item.id === idTermcondition,
    );
    if (!termcondition) return;
    newPenawaran.value.id_termcondition = termcondition.id ?? "";
    newPenawaran.value.nama_term = termcondition.nama_term;
  },
);

function statusColor(status: string) {
  if (status === "INVOICE") return "warning";
  if (status === "Draft") return "primary";
  if (status === "Ditolak") return "error";
  return "grey";
}

function openDialogTambahPenawaran() {
  data.penawaranAddEdit = "add";
  data.editOriginalCustomerId = "";
  newPenawaran.value = emptyPenawaran();
  data.dialogTambahPenawaran = true;
}

function openDialogEditPenawaran(item: penawaranM) {
  const customer = customerStore.getDataCustomer.find(
    (dataCustomer: any) =>
      dataCustomer.id === item.id_perusahaan ||
      dataCustomer.nama === item.id_perusahaan ||
      dataCustomer.nama === item.nama_perusahaan ||
      dataCustomer.pic === item.pic ||
      dataCustomer.vessel === item.vessel ||
      dataCustomer.email === item.email ||
      dataCustomer.no_telp === item.no_telp,
  );

  const termcondition = termconditionStore.getDataTermcondition.find(
    (dataTermcondition: any) =>
      dataTermcondition.id === item.id_termcondition ||
      dataTermcondition.nama_term === item.id_termcondition,
  );

  const penawaran = JSON.parse(JSON.stringify(item)) as penawaranM;
  penawaran.termCondition ??= [];
  if (customer?.id) {
    penawaran.id_perusahaan = customer.id;
    penawaran.nama_perusahaan = customer.nama;
  }

  data.penawaranAddEdit = "edit";
  data.editOriginalCustomerId = penawaran.id_perusahaan;
  newPenawaran.value = penawaran;
  data.dialogTambahPenawaran = true;
}

function tambahBarisPenawaran() {
  newPenawaran.value.penawaran_item.push({
    nama: "",
    amount: 0,
    uom: "",
    qty: 1,
    subtotal_item: 0,
    harga_hpp: 0,
  });
}

function hapusBarisPenawaran(index: number) {
  if (newPenawaran.value.penawaran_item.length === 1) {
    return notificationStore.showError("Minimal harus ada 1 baris item");
  }
  newPenawaran.value.penawaran_item.splice(index, 1);
}

async function simpanPenawaranDialog() {
  if (!newPenawaran.value.id_perusahaan) {
    return notificationStore.showError("Client belum dipilih");
  }
  if (
    !newPenawaran.value.tanggal_penawaran ||
    !newPenawaran.value.perihal.trim()
  ) {
    return notificationStore.showError("Tanggal dan perihal wajib diisi");
  }
  // if (
  //   !newPenawaran.value.penawaran_item.length ||
  //   newPenawaran.value.penawaran_item.some(
  //     (item) => !item.nama || item.qty <= 0 || item.amount <= 0,
  //   )
  // ) 
  // {
  //   return notificationStore.showError("Setiap item harus dilengkapi");
  // }

  newPenawaran.value.penawaran_item.forEach((item) => {
    item.harga_hpp = Number(item.harga_hpp) || 0;
    item.subtotal_item = Number(item.qty) * Number(item.amount);
  });
  newPenawaran.value.subtotal_penawaran = subtotalPenawaran.value;
  newPenawaran.value.grand_total_penawaran = subtotalPenawaran.value;
  newPenawaran.value.terbilang = terbilang(subtotalPenawaran.value);

  if (data.penawaranAddEdit === "add") {
    newPenawaran.value.no_penawaran ||= generateNoPenawaran();
    newPenawaran.value.id_penawaran =
      newPenawaran.value.no_penawaran.replaceAll("/", "-");
    newPenawaran.value.created_at = moment().unix();
    newPenawaran.value.created_by = userStore.getEmail;
    useloadingStore().setLoading(true);
    const result = await setPenawaran(newPenawaran.value);
    if (result !== "ok") {
      useloadingStore().setLoading(false);
      notificationStore.showError(result || "Gagal menyimpan penawaran");
      return;
    }

    data.dialogTambahPenawaran = false;
    newPenawaran.value = emptyPenawaran();
    useloadingStore().setLoading(false);
    await penawaranStore.tarikDataPenawaranAct();
    return;
  }

  await penawaranStore.updatePenawaranAct(newPenawaran.value);

  data.dialogTambahPenawaran = false;
  newPenawaran.value = emptyPenawaran();
}

async function hapusPenawaran(item: penawaranM) {
  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Hapus",
    "Anda yakin ingin menghapus penawaran ini?",
    { variant: "danger" },
  );
  if (!confirmed) return notificationStore.showError("Penghapusan dibatalkan");
  await penawaranStore.deletePenawaranAct(item);
}

async function refreshData() {
  useloadingStore().setLoading(true);
  sessionStorage.removeItem("penawaran");
  await penawaranStore.tarikDataPenawaranAct();
  useloadingStore().setLoading(false);
  notificationStore.showSuccess("Data Penawaran berhasil diperbarui");
}
</script>

<style scoped>
.penawaran-link {
  color: rgb(11, 66, 194);
  transition: color 0.2s ease;
}

.gap-2 {
  gap: 8px;
}
</style>
