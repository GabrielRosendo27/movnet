import { useActionNavigation } from "../../../../../hooks/useActionNavigation";
import { Button } from "../../../buttons/Button";

export function MovnetText() {
  const { handleActionNavigation } = useActionNavigation();
  return (
    <div className="xl:hidden flex justify-center items-center w-full p-4 ">
      <Button
        text="🎬 Movnet"
        className="text-myOrange text-3xl px-4 py-2 transition-transform duration-300 hover:text-myPurple hover:scale-105"
        onClick={() => handleActionNavigation("/")}
      />
    </div>
  );
}
