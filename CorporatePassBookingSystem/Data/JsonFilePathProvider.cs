public class JsonFilePathProvider
{
    public string JsonFilePath { get; set; }

    public JsonFilePathProvider(string jsonFilePath)
    {
        JsonFilePath = jsonFilePath;
    }
}