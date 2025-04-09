import React, { useEffect } from "react";
import { getFilteredHistory } from "../../utils/utils";
import { FormState } from "./useContributionForm";

interface HistoryItem {
  title: string;
  result: string;
  id: number;
}
interface FormFieldsProps {
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  validationErrors?: {
    type: string;
    msg: string;
    path: string;
    location: string;
    value: string;
  }[];
  userHistory: HistoryItem[];
  fromEdit: boolean;
  result: string;
  formErrors: FormState;
}

const FormFields: React.FC<FormFieldsProps> = ({
  formData,
  handleChange,
  validationErrors = [],
  fromEdit,
  userHistory,
  result,
  setFormData,
  formErrors,
}) => {
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

  const filteredHistory = getFilteredHistory(userHistory, result);

  useEffect(() => {
    if (fromEdit && filteredHistory) {
      setFormData({ ...filteredHistory }); // Ensure state is updated with history
    }
  }, []);

  console.log(filteredHistory, "updated");
  return (
    <>
      {fields.map(({ name, label, description }) => {
        const fieldError = Array.isArray(validationErrors)
          ? validationErrors?.find((error) => error.path === name)
          : undefined;
        return (
          <div key={name}>
            <label className="block font-semibold mb-1">{label}</label>
            <textarea
              name={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              placeholder={description}
              className={`w-full p-4 border ${
                fieldError ? "border-red-500" : "border-gray-200"
              } rounded-xl resize-none h-24 focus:outline-none focus:ring-2 focus:ring-orange-300`}
            />
            {fieldError && (
              <p className="text-red-500 text-xs mt-1">{fieldError.msg}</p>
            )}
            {formErrors[name as keyof typeof formErrors] && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors[name as keyof typeof formErrors]}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};

export default FormFields;
