function ProfileIcon() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <img
      src={
        currentUser?.profile ||
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      }
      alt="profile"
      width="40"
      height="40"
      className="rounded-circle border"
      style={{
        objectFit: "cover",
        cursor: "pointer",
      }}
    />
  );
}

export default ProfileIcon;