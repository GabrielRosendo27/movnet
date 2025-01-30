# Estágio de build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copiar e restaurar dependências
COPY *.csproj ./
RUN dotnet restore

# Copiar e publicar aplicação
COPY . ./
RUN dotnet publish -c Release -o out

# Estágio final
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

EXPOSE 80
ENTRYPOINT ["dotnet", "backend.dll"]