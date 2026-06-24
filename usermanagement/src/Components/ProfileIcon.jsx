function ProfileIcon() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <img
      src={
        currentUser?.profile ||
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      }
      alt="profile"
      onError={(e) => {
        e.currentTarget.src =
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
        e.currentTarget.onerror = null;
      }}
      className="rounded-circle border shadow-sm img-fluid"
      style={{
        width: "40px",
        height: "40px",
        objectFit: "cover",
        cursor: "pointer",
        minWidth: "40px",
      }}
    />
  );
}

export default ProfileIcon;