module.exports = (sequelize, DataTypes) => {
  const PollVote = sequelize.define(
    "PollVote",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      poll_option_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  PollVote.associate = (models) => {
    PollVote.belongsTo(models.PollOption, {
      foreignKey: "poll_option_id",
      as: "pollOption",
    });

    PollVote.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "voter",
    });

    // ✅ Ensure unique alias names
    models.User.hasMany(PollVote, {
      foreignKey: "user_id",
      as: "userVotes",
    });
  };

  return PollVote;
};
