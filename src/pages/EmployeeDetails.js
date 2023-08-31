import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { API_URI, BASE_URI, QUERY_STRINGS } from '../config';
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { loginRequest, protectedResources } from "../authConfig";

export const EmployeeDetails = () => {
    const [searchParams] = useSearchParams();
    const [EmployeeId, setEmployeeId] = useState(searchParams.get(QUERY_STRINGS.EmployeeId));
    const [Employee, setEmployee] = useState({ firstName: '', lastName: '' });

    const { isLoading, error, execute } = useFetchWithMsal({
        scopes: protectedResources.apiTodoList.scopes.read,
    });
    
    useEffect(() => {
        let isCancelled = false;
        let endpoint = `${BASE_URI}${API_URI.Employee}/${EmployeeId}`;
        console.log("endpoint : ", endpoint);
        execute("GET", endpoint).then((response) => {
            setEmployee(response?.payload);
            console.log("Employee Details : ", response?.payload);
        });

        return () => {
            isCancelled = true;
        }
    }, [EmployeeId, execute])
    
    return (
        <>
            {isLoading && <div><p>Please wait while details are feathing..</p></div>}
        {!!Employee && 
        <div>
                    <p>Employee Name : {Employee.firstName} {Employee.lastName}</p>
            </div>}
            
            {!Employee &&
                <div>
                    <p>Employee details not found</p>
                </div>}
        </>
    )
}
