import {create} from 'zustand';

export const useGrievance = create((set)=>({
    grievances : [],
    setGrievance : (grievances)=>set({grievances}),
    createGrievance : async (newGrievance)=>{
        if(!newGrievance.to || !newGrievance.from || !newGrievance.grievanceType || !newGrievance.subject || !newGrievance.description || !newGrievance.id){
            return ({success : false , message : "Please provide all details"}) };
        
            const res = await fetch("/api/grievances",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(newGrievance)
            }) ;
        const data = await res.json();
        console.log(data);
        if(data.success===true){
            set((state)=>({grievances : [...state.grievances,data.data]}))
            return ({success : true , message : "Grievance created successfully"})
        }
        else{
            console.log(data.message);
            return ({success : false , message : data.message})
        } ;    
    },
    fetchGrievances : async()=>{
        const res = await fetch("/api/grievances")
        const data = await res.json()
        if(data.success===true){
            set({grievances : data.data})
            return ({success : true , message : "Grievance fetched successfully"})
        }
        else{
            console.log(data.message);
            return ({success : false , message : data.message})
        } ;    
    }
    }))

  