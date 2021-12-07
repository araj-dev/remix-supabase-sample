import type { ActionFunction } from "remix";
import {supabaseClient} from "../utils/db.server";
import { redirect } from "remix";

// TODO: how to implement action in /index.ts
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const message = formData.get('message');
  if (!message) return redirect('/')

  await supabaseClient.from('messages').insert({
    text: message
  })

  return redirect('/')
}
