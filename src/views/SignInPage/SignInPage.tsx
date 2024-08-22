import { Button } from "@src/components/Button";
import { Form } from "@src/components/Form";
import { FormInput } from "@src/components/FormInput";
import { useState } from "react";

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Form title="LOG IN">
        <FormInput
          label="Email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <hr />
        <FormInput
          label="Password:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button>Sign In</Button>
      </Form>
    </>
  );
}
