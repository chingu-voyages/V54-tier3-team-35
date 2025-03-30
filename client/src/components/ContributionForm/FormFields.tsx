import React from "react";

interface FormFieldsProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormFields: React.FC<FormFieldsProps> = ({ formData, handleChange }) => {
  const fields = [
    {
      name: "persona",
      label: "Persona",
      description:
        "A persona describes who the result will be tailored for. For example: 'You are a Product Owner, Scrum Master...'",
    },
    {
      name: "context",
      label: "Context",
      description:
        "This provides background information to help the AI generate the best response.",
    },
    {
      name: "task",
      label: "Task",
      description:
        "The task defines what information you need. For example: 'Provide a list of websites...'",
    },
    {
      name: "output",
      label: "Output",
      description:
        "The output defines how you want the AI tool to respond. E.g. 'The tone should be informal...'",
    },
    {
      name: "constraint",
      label: "Constraint",
      description:
        "Constraint provides any boundaries you'd like the AI to honor in the result.",
    },
  ];

  return (
    <>
      {fields.map(({ name, label, description }) => (
        <div key={name}>
          <label className="block font-semibold mb-1">{label}</label>
          <p className="text-sm text-gray-500 mb-2 italic">
            {description}
          </p>
          <textarea
            name={name}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            className="w-full p-4 border border-gray-200 rounded-xl resize-none h-24 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
      ))}
    </>
  );
};

export default FormFields;