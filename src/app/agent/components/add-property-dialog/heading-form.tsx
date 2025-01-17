interface HeadingFormProps {
  title: string;
  description?: string;
}

export function HeadingForm({ title, description }: HeadingFormProps) {
  return (
    <div className="flex flex-col mb-6">
      <h3 className="text-lg font-semibold text-zinc-800">
        {title}
      </h3>
      <p className="text-sm text-zinc-500">
       {description}
      </p>
    </div>
  );
}
