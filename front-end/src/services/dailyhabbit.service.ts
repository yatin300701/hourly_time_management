
export default function HabbitsService() {
   
}
export const getDailyHabbits =  (date:number) =>{
    console.log("env is ",process.env);
    // return
    return  fetch("http://localhost:4000/api/"+`daily-habbit?date=${date}`).then(res=>res.json());
}
export const postDailyHabbit =  (payload:any)=>{
    return  fetch("http://localhost:4000/api/"+`daily-habbit`,{method:"post", headers: {
        'Content-Type': 'application/json'
      },body:JSON.stringify(payload)});
}

export const updateDailyHabbit = () =>{
    
}
export const deleteHabbit = (payload:any) =>{
    return fetch("http://localhost:4000/api/"+`daily-habbit?date__type=${payload.date__type}`,{method:'delete',headers:{ 'Content-Type': 'application/json'}})
}