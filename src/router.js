import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue';
import CoachesDetails from './pages/coaches/CoachDetails.vue';
import ContactForm from './pages/requests/ContactForm.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import RequestsList from './pages/requests/RequestsList.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachesDetails,
      props: true,
      children: [
        { path: 'contact', component: ContactForm }, // /coaches/a1/contact "Contact with a specific coach"
      ],
    },
    { path: '/register', component: CoachRegistration },
    { path: '/request', component: RequestsList },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
