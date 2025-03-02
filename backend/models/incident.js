module.exports = (sequelize, DataTypes) => {
  const Incident = sequelize.define(
    "Incident",
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
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      multimedia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  Incident.associate = (models) => {
    Incident.belongsTo(models.User, {
      foreignKey: "userId",
      as: "reportingUser", // ✅ Renamed alias to avoid conflicts
      onDelete: "CASCADE",
    });
  };

  return Incident;
};
