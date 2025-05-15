using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PaintMe.Data.Migrations
{
    /// <inheritdoc />
    public partial class second : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdateBy",
                table: "Categories",
                newName: "UpdatedBy");

            migrationBuilder.RenameColumn(
                name: "UpdateAt",
                table: "Categories",
                newName: "UpdatedAt");

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "ColoredFiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UpdatedBy",
                table: "ColoredFiles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "ColoredFiles");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "ColoredFiles");

            migrationBuilder.RenameColumn(
                name: "UpdatedBy",
                table: "Categories",
                newName: "UpdateBy");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Categories",
                newName: "UpdateAt");
        }
    }
}
