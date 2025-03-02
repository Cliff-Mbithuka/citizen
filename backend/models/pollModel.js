module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define(
    "Poll",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      question: {
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
  Poll.associate = (models) => {
    Poll.hasMany(models.PollOption, {
      foreignKey: "poll_id",
      as: "pollOptions",
    });
  };

  return Poll;
};
