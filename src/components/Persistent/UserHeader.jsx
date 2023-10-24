const UserHeader = ({ user }) => {
  console.log(user);
  const { username, name, avatar_url } = user;
  return (
    <article className='user-header'>
      <img src={avatar_url} alt='' className='user-header_img' />
      <div className='user-header_subContainer'>
        <h3 className='user-header_name'>{name}</h3>
        <p className='user-header_username'>{username}</p>
      </div>
    </article>
  );
};

export default UserHeader;
