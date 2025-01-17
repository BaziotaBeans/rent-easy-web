import Link from "next/link";

export function MultiStepFormFooter() {
  return (
    <div className="flex flex-col gap-2 mt-auto">
      <span className="text-sm text-zinc-500">
        Já possui uma conta?{" "}
        <Link
          className="text-primary-base font-medium hover:underline"
          href="/auth/sign-in"
        >
          Login
        </Link>
      </span>

      <p className="text-sm text-zinc-500">
        Ao criar uma conta, você concorda com nossos{" "}
        <Link className="font-medium underline" href="">
          Termos e Condições
        </Link>{" "}
        e{" "}
        <Link className="font-medium underline" href="">
          Declaração de Privacidade
        </Link>
        .
      </p>
    </div>
  );
}
