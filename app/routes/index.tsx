import type { MetaFunction, LoaderFunction, ActionFunction } from "remix";
import { useLoaderData, json, useActionData } from "remix";
import { supabaseClient } from '~/utils/db.server'

type Message = {
  id: number,
  created_at: string,
  room_id: number,
  text: string
}

export const loader: LoaderFunction = async () => {
  const { data, error } = await supabaseClient
    .from<Message>('messages')
    .select('*')

  return json(data)
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData)
}

export let meta: MetaFunction = () => {
  return {
    title: "Chatroom",
    description: "Chatroom sample with remix and supabase"
  };
};

export default function Index() {
  const data = useLoaderData<Message[]>();

  return (
    <div className="remix__page">
      <main>
        <div>
          {
            data.map((message: Message) => {
              return <p key={ message.id }>{ message.text }</p>
            })
          }
        </div>
        <div>
          <form method="post" action={"/message"}>
            <label><input name="message" type="text" /></label>
            <button type="submit">send</button>
          </form>
        </div>
      </main>
    </div>
  );
}
