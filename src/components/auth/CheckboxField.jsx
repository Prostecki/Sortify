export default function CheckboxField({ checked, onChange, className }) {
  return (
    <div className="flex justify-start w-full">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={className}
      />
      <label className="text-sm ml-4 text-gray-500">
        I have read and accept the{" "}
        <a className="text-sm text-blue-600 cursor-pointer hover:underline">
          Terms and Conditions
        </a>
      </label>
    </div>
  );
}
