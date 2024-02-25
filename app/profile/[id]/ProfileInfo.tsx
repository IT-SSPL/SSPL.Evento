import { Tables } from "@/types/supabase.types";

const DataBox = ({
  label,
  value,
  actionValue,
  hasDivider,
}: {
  label: string;
  value: string;
  actionValue?: string;
  hasDivider?: boolean;
}) => {
  return (
    <>
      {actionValue ? (
        <a className="join-item flex items-baseline" href={actionValue}>
          <p className="font-bold text-lg">{label}:</p>
          <p className="ml-2">{value}</p>
        </a>
      ) : (
        <div className="join-item flex items-baseline">
          <p className="font-bold text-lg">{label}:</p>
          <p className="ml-2">{value}</p>
        </div>
      )}
      {hasDivider && <div className="divider m-0.5" />}
    </>
  );
};

export const ProfileInfo = ({ user }: { user: Tables<"users"> }) => {
  return (
    <>
      {user.email && (
        <DataBox
          label="Email"
          value={user.email}
          actionValue={`mailto:${user.email}`}
          hasDivider
        />
      )}
      {user.phone && (
        <DataBox
          label="Telefon"
          value={user.phone}
          actionValue={`tel:+48${user.phone}`}
          hasDivider
        />
      )}
      {user.room && <DataBox label="Pokój" value={user.room} hasDivider />}
      {user.description && <DataBox label="Opis" value={user.description} />}
    </>
  );
};
