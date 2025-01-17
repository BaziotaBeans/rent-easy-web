import ContentSection from "../components/content-section";
import { ChangePassword } from "./components/change-password-form";

export default function Page() {
  return (
    <ContentSection title="Perfil" desc="Actualiza os dados do seu perfil.">
      <ChangePassword />
    </ContentSection>
  );
}
