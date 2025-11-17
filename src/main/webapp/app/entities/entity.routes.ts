import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'gestionEcoleApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'employe',
    data: { pageTitle: 'gestionEcoleApp.employe.home.title' },
    loadChildren: () => import('./employe/employe.routes'),
  },
  {
    path: 'profil',
    data: { pageTitle: 'gestionEcoleApp.profil.home.title' },
    loadChildren: () => import('./profil/profil.routes'),
  },
  {
    path: 'rubrique',
    data: { pageTitle: 'gestionEcoleApp.rubrique.home.title' },
    loadChildren: () => import('./rubrique/rubrique.routes'),
  },
  {
    path: 'menu',
    data: { pageTitle: 'gestionEcoleApp.menu.home.title' },
    loadChildren: () => import('./menu/menu.routes'),
  },
  {
    path: 'site',
    data: { pageTitle: 'gestionEcoleApp.site.home.title' },
    loadChildren: () => import('./site/site.routes'),
  },
  {
    path: 'profil-menu',
    data: { pageTitle: 'gestionEcoleApp.profilMenu.home.title' },
    loadChildren: () => import('./profil-menu/profil-menu.routes'),
  },
  {
    path: 'application',
    data: { pageTitle: 'gestionEcoleApp.application.home.title' },
    loadChildren: () => import('./application/application.routes'),
  },
  {
    path: 'ecole',
    data: { pageTitle: 'gestionEcoleApp.ecole.home.title' },
    loadChildren: () => import('./ecole/ecole.routes'),
  },
  {
    path: 'module',
    data: { pageTitle: 'gestionEcoleApp.module.home.title' },
    loadChildren: () => import('./module/module.routes'),
  },
  {
    path: 'rubrique-profil',
    data: { pageTitle: 'gestionEcoleApp.rubriqueProfil.home.title' },
    loadChildren: () => import('./rubrique-profil/rubrique-profil.routes'),
  },
  {
    path: 'profil-module',
    data: { pageTitle: 'gestionEcoleApp.profilModule.home.title' },
    loadChildren: () => import('./profil-module/profil-module.routes'),
  },
  {
    path: 'site-profil',
    data: { pageTitle: 'gestionEcoleApp.siteProfil.home.title' },
    loadChildren: () => import('./site-profil/site-profil.routes'),
  },
  {
    path: 'anneescolaire',
    data: { pageTitle: 'gestionEcoleApp.anneescolaire.home.title' },
    loadChildren: () => import('./anneescolaire/anneescolaire.routes'),
  },
  {
    path: 'type-document',
    data: { pageTitle: 'gestionEcoleApp.typeDocument.home.title' },
    loadChildren: () => import('./type-document/type-document.routes'),
  },
  {
    path: 'document',
    data: { pageTitle: 'gestionEcoleApp.document.home.title' },
    loadChildren: () => import('./document/document.routes'),
  },
  {
    path: 'niveau',
    data: { pageTitle: 'gestionEcoleApp.niveau.home.title' },
    loadChildren: () => import('./niveau/niveau.routes'),
  },
  {
    path: 'niveaudocument',
    data: { pageTitle: 'gestionEcoleApp.niveaudocument.home.title' },
    loadChildren: () => import('./niveaudocument/niveaudocument.routes'),
  },
  {
    path: 'classe',
    data: { pageTitle: 'gestionEcoleApp.classe.home.title' },
    loadChildren: () => import('./classe/classe.routes'),
  },
  {
    path: 'departement',
    data: { pageTitle: 'gestionEcoleApp.departement.home.title' },
    loadChildren: () => import('./departement/departement.routes'),
  },
  {
    path: 'filiere',
    data: { pageTitle: 'gestionEcoleApp.filiere.home.title' },
    loadChildren: () => import('./filiere/filiere.routes'),
  },
  {
    path: 'etudiant',
    data: { pageTitle: 'gestionEcoleApp.etudiant.home.title' },
    loadChildren: () => import('./etudiant/etudiant.routes'),
  },
  {
    path: 'inscription',
    data: { pageTitle: 'gestionEcoleApp.inscription.home.title' },
    loadChildren: () => import('./inscription/inscription.routes'),
  },
  {
    path: 'documentexcel',
    data: { pageTitle: 'gestionEcoleApp.documentexcel.home.title' },
    loadChildren: () => import('./documentexcel/documentexcel.routes'),
  },
  {
    path: 'documentclasse',
    data: { pageTitle: 'gestionEcoleApp.documentclasse.home.title' },
    loadChildren: () => import('./documentclasse/documentclasse.routes'),
  },
  {
    path: 'semestre',
    data: { pageTitle: 'gestionEcoleApp.semestre.home.title' },
    loadChildren: () => import('./semestre/semestre.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
