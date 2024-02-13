import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import { getAllTemplatePlans, getAllUserPlans, getRoutinesByPlan, getExerciseById } from "../../util/plan-service";
import './App.css'
import NavBar from "../../components/NavBar/Navbar";
import UserPage from '../UserPage/UserPage';
import MainPage from "../MainPage/MainPage";
import PlanPage from "../PlanPage/PlanPage";
import MetricsPage from "../MetricsPage/MetricsPage";
import { User } from "../../../models/User";
import { Exercise } from "../../../models/Exercise";
import { Routine } from "../../../models/Routine";
import { Plan } from "../../../models/Plan";

function App() {
  const [user, setUser] = useState<User>(new User());
  const [planList, setPlanList] = useState<Plan[]>([]);

  useEffect(() => {
      const loadTemplatePlans = async () => {
          //Load templates
          const planRes = await getAllTemplatePlans();
          const loadedTemplates = await loadPlanDetails(planRes);
          //Load user plans
          const userPlanRes = await getAllUserPlans(user.user_id);
          const loadedUserPlans = await loadPlanDetails(userPlanRes);
          setPlanList(loadedTemplates.concat(loadedUserPlans));
      }
      if (user.user_id > 0){
        loadTemplatePlans();
      }
  }, [user]);

  const loadPlanDetails = async (response: any) =>{
      const loadedPlanList: Plan[] = [];
      if (response){
          for (const planRow of response){
              const plan = new Plan(planRow.name, planRow.is_template, planRow.plan_id);
              const routineList: Routine[] = [];
              const routineRes = await getRoutinesByPlan(plan.plan_id);
              if (routineRes){
                  for (const routineRow of routineRes){
                      const routine = new Routine(routineRow.seq, routineRow.reps, routineRow.duration, routineRow.weight, routineRow.routine_id, routineRow.exercise_id, undefined, routineRow.plan_id);
                      const exerciseRes = await getExerciseById(routineRow.exercise_id);
                      if (exerciseRes){
                          const exercise = new Exercise(exerciseRes[0].name, exerciseRes[0].muscle_group, exerciseRes[0].description);
                          routine.exercise = exercise;
                      }
                      routineList.push(routine);
                  }
              }
              plan.routineList = routineList;
              loadedPlanList.push(plan);
          }
      } 
      return loadedPlanList;
  }

  if (!user.user_id){
    return(
    <>
      <Routes>
        <Route path="*" element={<UserPage setUser={setUser}/>}/>
      </Routes>
    </>
    );
  } else{
    return (
    <div className="appBody">
      <NavBar setUser={setUser}/>
      <Routes>
        <Route path="/main" element={<MainPage user={user} planList={planList}/>}/>
        <Route path="/plan" element={<PlanPage user={user} planList={planList} setPlanList={setPlanList}/>}/>
        <Route path="/metrics" element={<MetricsPage />}/>
        {/* <Route path="*" element={<MainPage />}/> */}
      </Routes>
    </div>
    )
  }
}

export default App
