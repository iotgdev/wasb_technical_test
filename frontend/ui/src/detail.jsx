import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const TeamMemberSummary = ({ member }) => {
  const outputYearsOfExperienceTitle = () => {
    if (member.years_of_exprerience > 40) {
    return 'old';
    } else if(member.years_of_exprerience > 60) {
      return 'ancient'
    } else if(member.years_of_exprerience < 30) {
      return 'barely out of diapers'
    } else {
      return 'probably a responsible adult'
    }
  }
  return (
    <div style={{padding: "20px"}}>
      <h1>{member.name}</h1>
      <p>
        <small>
          <span>Job Title: <b>{member.job_title}</b></span>
        </small>
      </p>
      <p>
        <small>
          <span>Info: <b>{member.introduction}</b></span>
        </small>
      </p>
      <p>
        <small>
          <span>Passion score: <b>{outputYearsOfExperienceTitle()}</b></span>
        </small>
      </p>
      <br/>
      <h3>Hobbies</h3>
      <TeamMemberHobbies hobbies={member.hobbies} />
      <br />
      <h3>Skills</h3>
      <TeamMemberSkills skills={member.skills} />
      <br />
    </div>
  )
}


const TeamMemberHobbies = ({ hobbies }) => {
  return (
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Proficiency</th>
      </tr>
      </thead>
      <tbody>
      {
        hobbies.map(
          (hobby, index) => (
            <tr key={`${index}-${hobby.strength}`}>
              <td>{hobby.name}</td>
              <td>{hobby.strength}</td>
            </tr>
          )
        )
      }
      </tbody>
    </table>
  );
}

const TeamMemberSkills = ({ skills }) => {
  return (
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Proficiency</th>
      </tr>
      </thead>
      <tbody>
      {
        skills.map(
          (skill, index) => (
            <tr key={`${index}-${skill.strength}`}>
              <td>{skill.name}</td>
              <td>{skill.strength}</td>
            </tr>
          )
        )
      }
      </tbody>
    </table>
  );
}


export default function TeamDetailPage (props) {

  const { match: { params: { teamMemberId }}} = props;

  const history = useHistory();

  const [member, setMember] = useState({});
  const [error, setError] = useState(false);

  useEffect(async () => {

    setError(false);
    const response = await fetch(`http://localhost:8000/team/profile/${teamMemberId}/`);
    if (response.status !== 200) {
        setError(true);
        return;
    }
    const member = await response.json();
    setMember(member)
  }, [setMember])

  console.log(member);

  if (!error && member.id) {
    return (
      <div>
        {/* TODO: add a "back" button */}
        <button type='button' onClick={() => history.goBack()}>Back</button>
        <TeamMemberSummary member={member}/>
      </div>
    )
  }
  return null;
}