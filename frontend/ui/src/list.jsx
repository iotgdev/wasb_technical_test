import {useEffect, useState, useMemo} from 'react';
import {Link, useLocation } from 'react-router-dom';


const TeamMemberListCard = ({member}) => {
  console.log(member)
  return (
    <div style={{padding: "20px"}}>
      <hr/>
      <p>
        <span>Name: <b>{member.name}</b></span>
      </p>
      <p>
        <small>
          <span>Job Title: <b>{member.job_title}</b></span>
        </small>
      </p>
      <p>
        <small>
          <span>Info: <b>{member.introduction}</b></span>
        </small>
      </p><p>
        <small>
          <span>Info: <b>{member.introduction}</b></span>
        </small>
      </p>
      <small>
        <Link to={`/team/${member.id}/`}>More Info...</Link>
      </small>
      <br/>
      <hr/>
    </div>
  )
}


export default function TeamListPage() {

  const [team, setTeam] = useState([]);
  const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

  const query = useQuery();


  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:8000/team/profile/${query.get('maximum_passion') !== null ? '?maximum_passion='+query.get("maximum_passion") : ''}`).then((response) => response.json()).then((value) => setTeam(value.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      })))
    } catch (error) {
      console.error('Error:', error);
    }

  }, [setTeam])

  return (
    <div>
      {
        team.map(
          (member) => (
            <TeamMemberListCard key={member.id} member={member}/>
          )
        )
      }
    </div>
  )
}