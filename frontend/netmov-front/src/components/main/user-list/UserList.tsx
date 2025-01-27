import { MainMenu } from "../../menu/MainMenu";

export function UserList() {
  return (
    <div className="bg-darkGradient w-screen h-screen text-white flex items-center justify-center gap-5">
      <MainMenu />
      <div className="border border-gray-900 w-[600px] h-[500px] p-4 flex items-center justify-center">
        <ul>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
      </div>
    </div>
  );
}
