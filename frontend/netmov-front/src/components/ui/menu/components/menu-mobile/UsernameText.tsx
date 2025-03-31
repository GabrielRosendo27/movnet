import { UsernameTextProps } from "../../types/types";

export function UsernameText({ isLoading, usernameError, userName }: UsernameTextProps) {
  return (
    <li className="hover:bg-gray-900 p-3 rounded-sm cursor-pointer w-full text-gray-300 mt-8 pl-4">
      <span className="flex pt-2 text-myPurple">
        {isLoading ? (
          "Carregando..."
        ) : (
          <>
            <span className="mr-2">Olá,</span> <span className="text-gray-300">{userName}</span>
          </>
        )}
      </span>

      {usernameError && <p>{usernameError?.message}</p>}
    </li>
  );
}
