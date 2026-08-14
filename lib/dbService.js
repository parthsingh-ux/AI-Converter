import { getDb } from "./mongodb";

export async function saveConversion(metaData, rawExportJson) {
  try {
    const db = await getDb();
    const collection = db.collection("conversions");

    const record = {
      ...metaData,
      rawExportJson,
      savedAt: new Date(),
    };

    await collection.updateOne(
      { id: metaData.id },
      { $set: record },
      { upsert: true }
    );
    return { success: true };
  } catch (err) {
    console.warn("MongoDB Save Warning:", err.message);
    return { success: false, error: err.message };
  }
}

export async function getConversions(limit = 50) {
  try {
    const db = await getDb();
    const collection = db.collection("conversions");
    const docs = await collection.find({}).sort({ timestamp: -1 }).limit(limit).toArray();
    return docs;
  } catch (err) {
    console.warn("MongoDB Fetch Warning:", err.message);
    return [];
  }
}

export async function getConversionById(id) {
  try {
    const db = await getDb();
    const collection = db.collection("conversions");
    const doc = await collection.findOne({ id });
    return doc;
  } catch (err) {
    console.warn("MongoDB Fetch By ID Warning:", err.message);
    return null;
  }
}

export async function deleteConversion(id) {
  try {
    const db = await getDb();
    const collection = db.collection("conversions");
    await collection.deleteOne({ id });
    return { success: true };
  } catch (err) {
    console.warn("MongoDB Delete Warning:", err.message);
    return { success: false, error: err.message };
  }
}
