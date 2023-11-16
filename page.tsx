"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;

}

function App() {
  const [data, setData] = useState<UserData[]>([]);
  const [records, setRecords] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<UserData[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterRecords = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    setRecords(
      data.filter( (f) =>
          f.name.toLowerCase().includes(inputValue) )
    );
  };

  return (
    <div className="p-5 bg-light">
      <div className="bg-white shadow border">
        <input type="text" className="form-control" onChange={filterRecords} placeholder="search" />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : (
              records.map((d, i) => (
                <tr key={i}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>{d.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
