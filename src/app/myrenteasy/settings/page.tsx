"use client";

import ContentSection from "./components/content-section";
import { ProfileForm } from "./profile/components/profile-form";

export default function Page() {
  return (
    <ContentSection
      title="Perfil"
      desc="Actualiza os dados do seu perfil."
    >
        <ProfileForm/>
    </ContentSection>
  );
}
