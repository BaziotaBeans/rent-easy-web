"use client"

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { IllustrationViewUserNormal } from "./components/illustration-user-view";
import { SelectUserType } from "./components/select-user-type";

export default function Page() {
    return (
        <main className="flex flex-col flex-1 bg-white py-10">
            <MaxWidthWrapper className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <IllustrationViewUserNormal/>

                <SelectUserType/>
            </MaxWidthWrapper>
        </main>
    );
}