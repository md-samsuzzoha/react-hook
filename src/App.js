import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';

function useFetch(url, defaultResponse) {
  const [data, setData] = useState(defaultResponse);

  async function getDataFromAPI() {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setData({
        isLoading: false,
        data
      });
    } catch (e) {
      console.error(e);
      setData({
        isLoading: false,
        data: e
      });
    }
  }

  useEffect(() => {
    getDataFromAPI()
  }, []);

  return data;
}

function App() {
  
  const Header = styled.header`
    text-transform: Capitalize;
  `;

  const Table = styled.table`
    margin: 0 auto;
    text-align: left;
  `;

  const Thead = styled.thead`
    background: #cccccc;
  `;

  const title = 'andrefmr'
  const apiEndpoint = `https://reqres.in/api/users`;
  const userFetchResponse = useFetch(apiEndpoint, {isLoading: true, data: null});

  if (!userFetchResponse.data || userFetchResponse.isLoading) {
    return 'Loading...';
  }
  
  const userData = userFetchResponse.data.data;

  return (
    <div className="App">
      <Header className="App-header">
        <div>
          <h2>Welcome {title}</h2>
        </div>
      </Header>
      <div className="App-body">
          <div>
          <Table className="table">
            <Thead>
              <tr>
                  <th style={{height: '50px'}}>First Name</th>
                  <th style={{height: '50px'}}>Last Name</th>
                  <th style={{height: '50px'}}>Email</th>
                  <th style={{height: '50px'}}>Avatar</th>
              </tr>
            </Thead>

            <tbody>
            {userData.map(user => {
              return(
                <tr key={user.id}>
                 <td style={{backgroundColor: 'white'}}>{user.first_name}</td>
                  <td style={{backgroundColor: 'white'}}>{user.last_name}</td>
                  <td style={{backgroundColor: 'white'}}>{user.email}</td>
                  <td style={{backgroundColor: 'white'}}><img src={user.avatar} alt={"user.avatar"}/></td>
              </tr>
              )
            })
            }

            </tbody>

          </Table>
          </div>
      </div>
    </div>
  );
}

export default App;
