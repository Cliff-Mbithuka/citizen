module.exports = (sequelize, DataTypes) => {
  const PollOption = sequelize.define(
    "PollOption",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      poll_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      option_text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  // ✅ Ensure unique alias names
  PollOption.associate = (models) => {
    PollOption.belongsTo(models.Poll, {
      foreignKey: "poll_id",
      as: "poll",
    });

    PollOption.hasMany(models.PollVote, {
      foreignKey: "poll_option_id",
      as: "optionVotes", // ✅ Changed alias
    });
  };

  return PollOption;
};
