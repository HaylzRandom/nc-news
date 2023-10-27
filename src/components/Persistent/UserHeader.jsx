const UserHeader = ({ user }) => {
  const { username, name, avatar_url } = user;
  return (
    <article className='user-header'>
      <img src={avatar_url} alt='' className='user-header_img' />
      <div className='user-header_subContainer'>
        {/* Will eventually link to a profile page */}
        <h2 className='user-header_name'>{name}</h2>
        <p className='user-header_username'>{username}</p>
      </div>
    </article>
  );
};

export default UserHeader;
