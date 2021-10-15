import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddQuestionComponent } from './components/admin/add-question/add-question.component';
import { AddCategoriesComponent } from './components/admin/add-categories/add-categories.component';
import { AddQuizComponent } from './components/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UpdateQuizComponent } from './components/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './components/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './components/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './components/admin/view-quizzes/view-quizzes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { LoadQuizComponent } from './components/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './components/user/instructions/instructions.component';
import { QuizStartComponent } from './components/user/quiz-start/quiz-start.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {path:'', component: AddQuizComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'categories', component: ViewCategoriesComponent},
      {path: 'add-category', component: AddCategoriesComponent},
      {path: 'quizzes', component: ViewQuizzesComponent},
      {path: 'add-quiz', component: AddQuizComponent},
      {path: 'quiz/:qid', component: UpdateQuizComponent},
      {path: 'view-questions/:qid/:title', component: ViewQuizQuestionsComponent},
      {path: 'add-question/:qid', component: AddQuestionComponent}
    ]
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [UserGuard],
    children: [
      {path: ':cid', component: LoadQuizComponent},
      {path: 'instructions/:qid', component: InstructionsComponent}
    ]
  },
  {path: 'start/:qid', 
  component: QuizStartComponent,
  canActivate: [UserGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
