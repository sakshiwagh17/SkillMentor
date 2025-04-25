export const FetchLearningPathFromAI = async (topic, subject) => {
    const response = await fetch('http://localhost:4000/api/recommendation/get-recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({topic,subject}), // <-- Fixed
    });
  
    const data = await response.json();
  
    console.log("Learning Path:", data.resources);
  
    if (data.success) {
      localStorage.setItem("learningPath", JSON.stringify(data.resources));
    }
    return data;
  }
  