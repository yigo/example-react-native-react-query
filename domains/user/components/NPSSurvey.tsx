import { Text, View, Button } from "react-native";
import { posthog, APIKEY } from "../../../infra/posthog";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


const surveyID = ""; // add survey id here

interface Survey {
  id: string;
  name: string;
  questions: {
    type: "single_choice";
    question: string;
    choices: string[];
  }[];
}

function useGetSurveys({ id }: { id: string }) {
  return useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const { data } = await axios.get(`https://app.posthog.com/api/surveys/?token=${APIKEY}`);
      console.log(data)
      return data.surveys.find((survey: any) => survey.id === id);
    }
  });
}

export default function NPSSurvey() {
  const { status, data } = useGetSurveys({ id: surveyID });
  
  if(status === 'pending') {
    return <Text>Loading...</Text>
  }
  if(status === 'error') {
    return <Text>Error!</Text>

  }
  return (
    <View>
      <Text>{`Encuesta ${data?.name}`}</Text>
      {data?.questions.map((question: any, qindex: number) => (
        <View key={`question-${qindex}`}>
          <Text>{question.question}</Text>
          {question.choices.map((choice: any, cindex: number) => (
            <Button key={`choice-${cindex}`} onPress={() => {
              posthog?.capture("survey sent", {
                $survey_id: surveyID, // required
                $survey_response: choice // required
              })
            }} title={choice} />
          ))}
        </View>
      ))}
    </View>
  )
}