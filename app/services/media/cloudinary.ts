export const uploadToCloudinary = async (mediaUri: string): Promise<string> => {
  try {
    console.log("Uploading media URI:", mediaUri);

    // Fetch the file as a blob
    const response = await fetch(mediaUri);
    if (!response.ok) throw new Error("Failed to fetch the file");

    const blob = await response.blob();
    console.log("Blob created successfully");

    // Prepare form data
    const formData = new FormData();
    formData.append("file", blob); // No need for a filename
    formData.append("upload_preset", "the-curator"); // Replace with your upload preset

    // Cloudinary endpoint
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/the-curator/image/upload";

    // Upload to Cloudinary
    const cloudinaryResponse = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!cloudinaryResponse.ok) {
      console.error(
        "Cloudinary response failed:",
        await cloudinaryResponse.text()
      );
      throw new Error("Cloudinary upload failed");
    }

    const data = await cloudinaryResponse.json();
    console.log("Uploaded to Cloudinary:", data.secure_url);
    console.log("Cloudinary response:", await cloudinaryResponse.text());

    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
