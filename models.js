module.exports = (ORM, connection)=> {
  const Room = connection.define('room', {
    id: {
      type: ORM.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    game: {
      type: ORM.TEXT,
      allowNull: false,
    },
    players: {
      type: ORM.ARRAY( ORM.TEXT ),
      allowNull: false,
    },
  }, { freezeTableName: true });

  return { Room };
};
