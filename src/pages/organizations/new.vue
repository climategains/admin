<script setup>
import Steps from "@/components/Steps.vue";
import Table from "@/components/ui/application/table.vue";
import Form from "@/components/ui/form.vue";
import { ref, computed, watch } from "vue";
import Nav from "@/components/ui/nav.vue";
import useAuthUser from "@/composables/UseAuthUser";
import { useToast } from "vue-toastification";
import { onMounted, reactive } from "vue";

const { user } = useAuthUser();

const toast = useToast();

import useSupabase from "@/composables/UseSupabase";
const { supabase } = useSupabase();

import useStore from "../../store";
const store = useStore();

store.breadcrumbs = [
  { name: "Organizations", href: "organizations" },
  { name: "New Organization", href: "new_organization" },
];

const state = reactive({
  data: null,
  media: null,
  messages: null,
});

onMounted(async () => {
  let { data: org } = await supabase.from("organisations").select("*");

  state.data = await org;
});

const classes = {
  label: "block mb-2 font-bold text-sm",
  inner:
    "max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500",
  input:
    "w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400",
  help: "text-xs text-gray-500",
  message: "text-red-500 mb-1 text-xs",
};

const submitted = ref(false);

const submitHandler = async function (payload, node) {
  // assume a failing request

  await createOrg();
  submitted.value = true;
  toast.success("Your organization has been created", {
    timeout: 4000,
  });
  await new Promise((r) => setTimeout(r, 3000));

  resetForm();
  // node.setErrors(["Something went wrong with the server, please try again"]);
};

function showError() {
  toast.warning("Required fields are missing or incomplete.", {
    position: "top-right",
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
  });
}

const index = ref(null);

const pages = [
  { name: "Organizations", href: "organizations", current: false },
];

function select(value) {
  if (index.value == value) {
    index.value = false;
  } else {
    index.value = value;
  }
}
function goBack() {
  index.value = null;
}

function clearDraft() {
  resetForm();
  toast.info("Form draft cleared", {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
  });
}
function resetForm() {
  store.forms.organisation.name = null;
  store.forms.organisation.billingSameAsContact = true;
  store.forms.organisation.email = null;
  store.forms.organisation.phone = null;
  store.forms.organisation.website = null;
  store.forms.organisation.contact_address = {
    street: "",
    city: "",
    zip: "",
    country: "",
  };

  store.forms.organisation.carbon_registry_id = null;
  store.forms.organisation.carbon_registry_link = null;
}

const myForm = ref(null);

function submitForm() {
  // retrieve the core node (several ways to do this):
  const node = myForm.value.node;
  // submit the form!
  node.submit();
}

async function createOrg() {
  const { data, error } = await supabase
    .from("organisations")
    .insert([
      {
        name: store.forms.organisation.name,
        contact_address: store.forms.organisation.contact_address,
        billing_address: store.forms.organisation.billing_address,
        payment_accounts: store.forms.organisation.payment_accounts,
        email: store.forms.organisation.email,
        phone: store.forms.organisation.phone,
        website: store.forms.organisation.website,
        carbon_registry_id: store.forms.organisation.carbon_registry_id,
        carbon_registry_link: store.forms.organisation.carbon_registry_link,
      },
    ])
    .select();

  console.log(error);
  console.log(data);
  return data;
}
</script>

<template>
  <div class="pt-10 mb-5 flex justify-between px-12">
    <div class="w-2/3">
      <h3 class="text-2xl font-bold pb-4 border-b mr-10">
        Create a new organization
      </h3>
      <p class="mt-3">
        Your application will autosave as you fill it out. It will also save any
        parts you complete. So you can fill out the form in one go or over time.
        You can navigate between sections - you don't have to fill out the
        applicaton in the order shown.
      </p>
    </div>

    <div class="box w-1/4 bg-gray-50 border rounded-xl p-6">
      <button class="bg-red-500 mb-3 border-none" @click="clearDraft()">
        Clear Draft
      </button>
      <button
        class="bg-black border-none text-white border border-black"
        @click="submitForm()"
      >
        Submit
      </button>

      <!-- <span class="underline mr-2 font-bold" @click="index = null"
              >back</span
            > -->
    </div>
  </div>
  <div class="px-12 w-full">
    <FormKit
      id="registration-example"
      ref="myForm"
      type="form"
      :form-class="submitted ? 'hide' : 'show'"
      :actions="false"
      @submit="submitHandler"
      @submit-invalid="showError()"
    >
      <div class="flex w-full mb-2">
        <FormKit
          v-model="store.forms.organisation.name"
          type="text"
          name="name"
          label="Organization name"
          placeholder="My Organization"
          validation="required"
          :classes="classes"
          outer-class="w-full mr-2"
        />

        <FormKit
          v-model="store.forms.organisation.website"
          type="text"
          label="Website"
          placeholder="https://www.example.com..."
          :classes="classes"
          outer-class="w-full ml-2"
        />
      </div>
      <div class="flex w-full mb-2">
        <FormKit
          v-model="store.forms.organisation.email"
          type="text"
          name="email"
          label="Email"
          placeholder="jane@organization.com"
          validation="required|email"
          :classes="classes"
          outer-class="w-full mr-2"
        />

        <FormKit
          v-model="store.forms.organisation.phone"
          type="tel"
          label="Phone number"
          placeholder="xxx-xxx-xxxx"
          validation="contains_numeric"
          validation-visibility="live"
          outer-class="w-full ml-2"
          :classes="classes"
        />
      </div>
      <div class="flex mb-3">
        <div class="mr-3">
          <FormKit
            v-model="store.forms.organisation.contact_address"
            type="group"
          >
            <FormKit
              type="text"
              label="Contact address"
              name="street"
              placeholder="Street address"
              validation="required"
              :classes="classes"
              outer-class="mb-2"
            />
            <div class="double flex mb-2">
              <FormKit
                class="mr-10"
                type="text"
                placeholder="City"
                name="city"
                validation="required"
                :classes="classes"
                outer-class="mr-2 "
              />
              <FormKit
                type="text"
                class="ml-1"
                name="zip"
                placeholder="Zip Number"
                validation="required|number"
                :classes="classes"
                outer-class="ml-0"
              />
            </div>
            <FormKit
              type="text"
              name="country"
              placeholder="Country"
              validation="required"
              :classes="classes"
              outer-class="mb-0"
            />

            <div class="inline-flex items-center mt-3 justify-start">
              <input
                id="check"
                v-model="store.forms.organisation.billingSameAsContact"
                type="checkbox"
                name="scales"
                class="w-7 h-4"
                checked
              />
              <label
                class="h-3 mb-0 flex items-center h-4 font-normal text-xs"
                for="check"
                >Billing address same as contact address</label
              >
            </div>
          </FormKit>
        </div>
        <div class="ml-3">
          <FormKit
            v-if="!store.forms.organisation.billingSameAsContact"
            v-model="store.forms.organisation.billing_address"
            type="group"
          >
            <FormKit
              type="text"
              label="Billing address"
              name="street"
              placeholder="Street address"
              validation="required"
              :classes="classes"
              outer-class="mb-2"
            />
            <div class="double flex mb-2">
              <FormKit
                class="mr-10"
                type="text"
                placeholder="City"
                name="city"
                validation="required"
                :classes="classes"
                outer-class="mr-2 mt-0"
              />
              <FormKit
                type="text"
                class="ml-10"
                name="zip"
                :classes="classes"
                placeholder="Zip Number"
                validation="required|number"
              />
            </div>
            <FormKit
              type="text"
              name="country"
              :classes="classes"
              placeholder="Country"
              validation="required"
            />
          </FormKit>
        </div>
      </div>
      <FormKit
        v-model="store.forms.organisation.payment_accounts"
        type="text"
        name="iban"
        :classes="classes"
        label="Organization Payment Account"
        placeholder="IBAN"
        validation="required"
      />
      <div class="flex w-full mt-4">
        <FormKit
          v-model="store.forms.organisation.carbon_registry_id"
          type="text"
          name="Carbon Registry ID"
          :classes="classes"
          label="Carbon Registry ID"
          placeholder="Carbon Registry ID"
          outer-class="w-full mr-4"
        />
        <FormKit
          v-model="store.forms.organisation.carbon_registry_link"
          type="text"
          name="Carbon Registry Link"
          :classes="classes"
          label="Carbon Registry Link"
          placeholder="Carbon Registry Link"
          outer-class="w-full"
        />
      </div>
    </FormKit>
  </div>
</template>
<style></style>
