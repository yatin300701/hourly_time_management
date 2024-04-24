
export default function HabbitsService() {
   
}
export const getDailyHabbits =  (date:Date) =>{
    return  fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}daily-habbit?date=${date}`).then(res=>res.json());
}
export const postDailyHabbit =  (payload:any)=>{
    return  fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}daily-habbit`,{method:"post", headers: {
        'Content-Type': 'application/json'
      },body:JSON.stringify(payload)});
}

export const updateDailyHabbit = (payload:any) =>{
    return fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}daily-habbit`,{method:"put", headers: {
        'Content-Type': 'application/json'
      },body:JSON.stringify(payload)});
    
}
export const deleteHabbit = (payload:any) =>{
    return fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}daily-habbit?date__type=${payload.date__type}`,{method:'delete',headers:{ 'Content-Type': 'application/json'}})
}