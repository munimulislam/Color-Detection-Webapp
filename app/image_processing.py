from sklearn.cluster import KMeans
from PIL import Image
import numpy as np

def get_dominant_colors(file, n_colors=5):
    img = Image.open(file).convert("RGB")
    img = img.resize((200, 200))
    img_data = np.array(img)
    img_data = img_data.reshape(-1, 3)

    kmeans = KMeans(n_clusters=n_colors, n_init=5, random_state=42)
    kmeans.fit(img_data)
    colors = kmeans.cluster_centers_.astype(int)

    result = [{"r": int(c[0]), "g": int(c[1]), "b": int(c[2])} for c in colors]
    return result