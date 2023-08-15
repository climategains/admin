import { defineStore } from 'pinia';

import useSupabase from "@/composables/UseSupabase";
const { supabase } = useSupabase();

const useStore = defineStore('useAdminsNewIn', {
	state: () => ({
		breadcrumbs: [
			{name: 'Programmes', href: 'programmes'},
			{name: 'New Programme', href: 'new_programme'},
			{name: '', href: ''}],
        organizations: {},
		contacts: [],
		steps: [],
		questions: [],
		users: [],
		programmes: [],
		projects: {
			all: [],
			steps: [],
			responses: []
		},
		forms: {
            organisation: {
                name: null,
                contact_address: null,
                billing_address: null,
                billingSameAsContact: true,
                payment_accounts: null,
                email: null,
                phone: null,
                website: null,
                carbon_registry_id: null,
                carbon_registry_link: null,
            },
			programme: [
				{
					id: 1,
					title: "Programme Details",
					description: "Provide details about the programme you are creating",
					questions: [
					  {
						text: "What is the name of the programme?",
						id: "name",
						helper: "",
						type: "text",
						answer: null,
					  },
					  {
						text: "What country is it operating in?",
						id: "country_code",
						type: "select_country",
						answer: null,
					  },
					  {
						text: "Where is the programme based?",
						id: "location_name",
						type: "text",
						answer: null,
					  },
					  {
						text: "What is your funding source?",
						id: "funding_source",
						type: "text",
						answer: null,
					  },
					  {
						text: "What sector is it operating in?",
						id: "default_sector",
						type: "sector_select",
						options: [
							{ title: "Solar Energy", icon: "heroicons-outline:sun" },
							{ title: "Wind Energy", icon: "mingcute:wind-line" },
							{ title: "Biomass Energy", icon: "fluent:plant-grass-28-regular" },
							{ title: "Other", icon: "fluent:earth-leaf-20-regular" },
						  ],
						answer: null,
					  },
					  {
						text: "What is the organization?",
						id: "organisation",
						type: "select_organization",
						answer: null,
					  },
					],
				  },
				{
					id: 2,
					title: "Programme Steps",
					description: "Define the steps required by an activist to complete the programme",
					children: [{
					order: "",
					name: "",
					description: "",
					funding_amount: "",
					worktime: "",
					risks: [],
					supplies: [],
					suppliers: [],
					active: true,
					funding_currency: "EUR",
					support: "",
					questions: [{order: 100, text: null}]
					}]
				},
			  {
				id: "3",
				title: "Backing Details",
				description:
				  "Provide details about the financial backing of this programme",
				questions: [
				  {
					text: "What is the type of backing?",
					id: "backing_type",
					helper: "",
					type: "text",
					answer: null,
				  },
				  {
					text: "What is the amount of funding?",
					id: "funding_amount",
					type: "text",
					answer: null,
				  },
				  {
					text: "What is funding currency?",
					id: "funding_currency",
					type: "text",
					answer: null,
				  },
				  {
					text: "Describe the support you are providing.",
					id: "support_description",
					type: "text",
					answer: null,
				  },
				  {
					text: "What type of returns are you expecting?",
					id: "returns_type",
					type: "text",
					answer: null,
				  },
				  {
					text: "What number of returns are you expecting?",
					id: "returns_amount",
					type: "text",
					answer: null,
				  },
				  {
					text: "Describe the returns you are expecting",
					id: "returns_description",
					type: "text",
					answer: null,
				  },
				],
			  }]
        },
		role: 'activist'
	}),
	actions: {
		async initializeApp() {
		
		},
		async fetchUsers() {
			let { data: profiles, error } = await supabase.from('profile').select('*');
			this.users = profiles;
		},
		async fetchContacts() {
			let { data: contacts, error } = await supabase.from('contacts').select('*');
			this.contacts = contacts;
		},
        async fetchOrganizations() {
			let { data: organisation, error } = await supabase.from('organisations').select('*');
            console.log(organisation);
			this.organizations = organisation;
		},
		async fetchProgrammes() {
			let { data: programme, error } = await supabase.from('programme').select('*');
			this.programmes = programme;
		},
		async fetchQuestions() {
			let { data: programme_response, error } = await supabase.from('programme_response').select('*');
			this.questions = programme_response;
		},
		async fetchSteps() {
			let { data: programme_step, error } = await supabase.from('programme_step').select('*');
			this.steps = programme_step;
		},
		async fetchMedia() {
			let { data: medium, error } = await supabase.from('medium').select('*');
			this.global.media = medium;
		},
		async fetchRoles() {
			let { data: role, error } = await supabase.from('role').select('*');
			this.global.roles = role;
		},
		async fetchProjects() {
			let { data: project, error } = await supabase.from('project').select('*');
			this.projects.all = project;
		},
		async fetchProjectSteps() {
			let { data: step, error } = await supabase.from('step').select('*');
			this.projects.steps = step;
		},
		async fetchProjectResponses() {
			let { data: response, error } = await supabase.from('response').select('*');
			this.projects.responses = response;
		},
		async fetchProfiles() {
			let { data: profile_for_all, error } = await supabase.from('profile_for_all').eq('id', id);
			this.global.profiles = profile;
		}
	},
	getters: {
		getProgramme: state => id => {
			return state.global.programmes.filter(x => x.id == id)[0];
		},
		getProject: state => id => {
			return state.global.projects.filter(x => x.id == id)[0];
		},
		getMedia() {
			return id => this.global.media.filter(x => x.programme_id === id);
		},
		getSteps() {
			return id => this.global.steps.filter(x => x.programme_id === id);
		},
		getQuestion() {
			return id => this.global.questions.filter(x => x.id === id);
		},
		getProgrammeQuestions() {
			return id => this.global.questions.filter(x => x.programme_step_id === id);
		},
		getPoster() {
			return id => this.getMedia(id).filter(x => x.role === 'poster')[0];
		},
		getVideo() {
			return id => this.getMedia(id).filter(x => x.role === 'video')[0];
		},
		getGallery() {
			return id => this.getMedia(id).filter(x => x.role === 'gallery_picture');
		},
		getUser() {
			return id => this.global.users.filter(x => x.id === id);
		},
		getUserRoles() {
			return id => this.global.roles.filter(x => x.user_id === id);
		},
		getIncome() {
			return id =>
				this.getSteps(id)
					.map(x => x.funding_amount)
					.reduce((total, item) => total + item);
		},
		getWorktime() {
			return id =>
				this.getSteps(id)
					.map(x => x.worktime)
					.reduce((total, item) => total + item);
		},
		getCurrency() {
			return id => this.getSteps(id)[0].funding_currency;
		}
	},
    persist: true
});

export default useStore;
