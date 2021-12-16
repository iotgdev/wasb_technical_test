import {useEffect, useState} from 'react';


const TeamMemberSummary = ({ member }) => {
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
      <br/>
      <h3>Hobbies</h3>
      <TeamMemberHobbies hobbies={member.hobbies} />
      <br />
      <h3>Skills</h3>
      <TeamMemberSkills skills={member.skills} />
      <br />
      <h3>Passionate</h3>
      <TeamMemberPassion passion={member.passion} />
      <br />
      <h3>Approximate age</h3>
      <TeamMemberApproxAge approxAge={member.approx_age} />
      <br />
      <h3>About</h3>
      <TeamMemberAbout
        proficiency={member.average_skill_proficiency}
        exp={member.years_of_experience}
        maxPassion={member.maximum_passion}
      />
      <br />
    </div>
  )
}


const TeamMemberHobbies = ({ hobbies }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Proficiency</th>
        </tr>
        {
          hobbies.map(
            (hobby, index) => (
              <tr key={`hobby-item-${index}`}>
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
      <tbody>
        <tr>
          <th>Name</th>
          <th>Proficiency</th>
        </tr>
      {
        skills.map(
          (skill, index) => (
            <tr key={`skill-item-${index}`}>
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

const TeamMemberPassion = ({ passion }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Passion Score</td>
          <td>{passion}</td>
        </tr>
      </tbody>
    </table>
  );
}

const TeamMemberApproxAge = ({ approxAge }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Approximate age</td>
          <td>{approxAge}</td>
        </tr>
      </tbody>
    </table>
  );
}

const TeamMemberAbout = ({ proficiency, exp, maxPassion }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Proficiency</td>
          <td>{proficiency}</td>
        </tr>
        <tr>
          <td>Experience</td>
          <td>{exp}</td>
        </tr>
        <tr>
          <td>Max Passion</td>
          <td>{maxPassion}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default function TeamDetailPage (props) {

  const { match: { params: { teamMemberId }}} = props;

  const [member, setMember] = useState({});
  const [error, setError] = useState(false);

  useEffect( () => {
    setError(false);

    async function fetchData() {
      const response = await fetch(`http://localhost:8000/team/profile/${teamMemberId}/`);
      if (response.status !== 200) {
        setError(true);
        return;
      }
      const member = await response.json();
      setMember(member)
    }

    fetchData();
  }, [teamMemberId])

  if (!error && member.id) {
    return (
      <div>
        {/* TODO: add a "back" button */}
        <TeamMemberSummary member={member}/>
      </div>
    )
  }
  else {
    return (
      <div style={{padding: "20px"}}>Oops! An error occurred..</div>
    )
  }
}